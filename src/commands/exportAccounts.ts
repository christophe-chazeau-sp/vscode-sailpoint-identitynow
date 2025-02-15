import * as vscode from 'vscode';
import { IdentityNowResourceTreeItem, SourceTreeItem } from '../models/IdentityNowTreeItem';
import { Schema } from '../models/Schema';
import { PathProposer } from '../services/PathProposer';
import { askFile } from '../utils/vsCodeHelpers';
import { BaseCSVExporter } from './BaseExporter';
import AccountPaginator from './AccountPaginator';
import { Account } from '../models/Account';


export class AccountExporterCommand {


    /**
     * Entry point 
     * @param node 
     * @returns 
     */
    async execute(node?: IdentityNowResourceTreeItem) {

        console.log("> AccountExporter.execute");


        if (node === undefined || !(node instanceof SourceTreeItem)) {
            console.log("WARNING: AccountExporter: invalid item", node);
            throw new Error("AccountExporter: invalid item");
        }

        const proposedPath = PathProposer.getAccountReportFilename(
            node.tenantName,
            node.tenantDisplayName,
            node.label as string
        );
        const filePath = await askFile(
            "Enter the file to save the account report to",
            proposedPath
        );
        if (filePath === undefined) {
            return;
        }

        const exporter = new AccountExporter(
            node.tenantId,
            node.tenantName,
            node.tenantDisplayName,
            node.id as string,
            filePath
        );
        await exporter.exportFileWithProgression();
    }
}
class AccountExporter extends BaseCSVExporter<Account> {

    constructor(
        tenantId: string,
        tenantName: string,
        tenantDisplayName: string,
        sourceId: string,
        path: string

    ) {
        super("accounts",
            tenantId,
            tenantName,
            tenantDisplayName,
            sourceId,
            path);
    }

    protected async exportFile(task: any, token: vscode.CancellationToken): Promise<void> {

        console.log("> AccountExporter.exportFile");
        const schemas = await this.client.getResource(`/v3/sources/${this.sourceId}/schemas`);
        if (schemas === null || !Array.isArray(schemas)) {
            console.error("Could not retrieve account schema");
            throw new Error("Could not retrieve account schema");
        }
        const schema = schemas.find(x => x.name === 'account') as Schema;

        if (token.isCancellationRequested) {
            return;
        }

        const headers: string[] = [];
        const paths: string[] = [];
        const unwindablePaths: string[] = [];
        schema.attributes.forEach(x => {
            headers.push(x.name);
            const path = 'attributes.' + x.name;
            paths.push(path);
            if (x.isMulti) { unwindablePaths.push(path); }
        });

        const iterator = new AccountPaginator(this.client, this.sourceId);
        await this.writeData(headers, paths, unwindablePaths, iterator, task, token);
    }

}

export class UncorrelatedAccountExporterCommand {

    /**
     * Entry point 
     * @param node 
     * @returns 
     */
    async execute(node?: SourceTreeItem) {
        console.log("> UncorrelatedAccountExporter.execute");

        if (node === undefined) {
            console.log("WARNING: UncorrelatedAccountExporter: invalid item", node);
            throw new Error("UncorrelatedAccountExporter: invalid item");
        }

        const proposedPath = PathProposer.getUncorrelatedAccountReportFilename(
            node.tenantName,
            node.tenantDisplayName,
            node.label as string
        );
        const filePath = await askFile(
            "Enter the file to save the account report to",
            proposedPath
        );
        if (filePath === undefined) {
            return;
        }

        const answer = await vscode.window.showQuickPick(
            ["No", "Yes"],
            { placeHolder: 'Do you want to export account attributes?' });
        if (answer === undefined) {
            console.log("< execute: no answer");
            return;
        }

        const exportAccountAttributes = answer === "Yes";

        const exporter = new UncorrelatedAccountExporter(
            node.tenantId,
            node.tenantName,
            node.tenantDisplayName,
            node.id as string,
            filePath,
            exportAccountAttributes
        );
        await exporter.exportFileWithProgression();
    }
}

class UncorrelatedAccountExporter extends BaseCSVExporter<Account> {
    constructor(
        tenantId: string,
        tenantName: string,
        tenantDisplayName: string,
        sourceId: string,
        path: string,
        private exportAccountAttributes: boolean
    ) {
        super("accounts",
            tenantId,
            tenantName,
            tenantDisplayName,
            sourceId,
            path);
    }

    protected async exportFile(task: any, token: vscode.CancellationToken): Promise<void> {

        console.log("> UncorrelatedAccountExporter.exportFile");
        const headers: string[] = [
            "account","displayName","userName","type"
        ];
        const paths: string[] = [
            "nativeIdentity","name","userName","type"
        ];
        const unwindablePaths: string[] = [];

        if (token.isCancellationRequested) {
            return;
        }

        if (this.exportAccountAttributes) {
            const schemas = await this.client.getResource(`/v3/sources/${this.sourceId}/schemas`);
            if (schemas === null || !Array.isArray(schemas)) {
                console.error("Could not retrieve account schema");
                throw new Error("Could not retrieve account schema");
            }
            const schema = schemas.find(x => x.name === 'account') as Schema;
            schema.attributes.forEach(x => {
                headers.push(x.name);
                const path = 'attributes.' + x.name;
                paths.push(path);
                //if (x.isMulti) { unwindablePaths.push(path); }
            });
        } else {
         
        }
        if (token.isCancellationRequested) {
            return;
        }
        const iterator = new AccountPaginator(this.client, this.sourceId, true);
        await this.writeData(headers, paths, unwindablePaths, iterator, task, token);
    }

}







