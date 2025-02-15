import * as vscode from 'vscode';
import { WorkflowTreeItem } from '../models/IdentityNowTreeItem';
import { IdentityNowClient } from '../services/IdentityNowClient';
import { getWorkflowExecutionDetailUri } from '../utils/UriUtils';
import { WorkflowExecution } from '../models/workflow';

export async function viewWorkflowExecutionHistory(node: WorkflowTreeItem): Promise<void> {

    console.log("> viewWorkflowExecutionHistory", node);
    // assessing that item is a IdentityNowResourceTreeItem
    if (node === undefined || !(node instanceof WorkflowTreeItem)) {
        console.log("WARNING: viewWorkflowExecutionHistory: invalid item", node);
        throw new Error("viewWorkflowExecutionHistory: invalid item");
    }
    const client = new IdentityNowClient(node.tenantId, node.tenantName);

    let history = await vscode.window.withProgress<WorkflowExecution[]>({
        location: vscode.ProgressLocation.Notification,
        title: 'Listing workflow executions...',
        cancellable: false
    }, async (task, token) => {
        return await client.getWorkflowExecutionHistory(node.id as string) as WorkflowExecution[];
    });

    if (history === undefined || !Array.isArray(history) || history.length < 1) {
        await vscode.window.showErrorMessage('No execution history');
        return;
    }

    // Sorting descendant to get latest execution first
    history.sort((a, b) => (a.startTime < b.startTime) ? 1 : -1);

    // At this moment, the execution history is kept 2 days. No need to display more
    const oldest = new Date();
    oldest.setDate(oldest.getDate() - 2);
    const oldestStr = oldest.toISOString();
    console.log('Looking for execution more recent than ', oldestStr);

    history = history.filter(a => a.startTime > oldestStr);
    if (history.length < 1) {
        await vscode.window.showErrorMessage('No execution history');
        return;
    }
    const items = history.map<vscode.QuickPickItem>(x => ({
        label: x.id,
        detail: x.startTime
    }));

    const item = await vscode.window.showQuickPick<vscode.QuickPickItem>(items);

    if (item === undefined) {
        console.log("< viewWorkflowExecutionHistory: no selected item");
        return;
    }
    console.log('viewWorkflowExecutionHistory: selected item:', item);

    const uri = getWorkflowExecutionDetailUri(node.tenantName, item?.label as string);
    console.log('viewWorkflowExecutionHistory: uri:', uri);

    let document = await vscode.workspace.openTextDocument(uri);
    document = await vscode.languages.setTextDocumentLanguage(document, 'json');
    await vscode.window.showTextDocument(document, { preview: true });
    console.log("< viewWorkflowExecutionHistory");
}