# SailPoint IdentityNow for Visual Studio Code

> This extension is not developed, maintained or supported by SailPoint. 
> It is a community effort to help manage IdentityNow from Visual Studio Code.

The SailPoint IdentityNow extension makes it easy to:

- Connect to several tenants
- Import and export config of a tenant
- View, edit, aggregate or reset sources
- View, create, edit, delete, and test transforms
- View, create, edit, delete provisioning policies of a source
- View, create, edit, delete schemas of a source
- View, edit, enable, disable, and test workflows and view execution history
- View, create, edit, delete connector rules and export/import the script of a rule
- View, edit, delete service desk integrations
- View, edit, delete identity profiles and lifecycle states, and refreshes all the identities under a profile

## Installation

Go to the extension menu or press `Ctrl`+`Shift`+`X` and look for the extension "IdentityNow". Click on the button `Install`.

The VSIX can be installed from the extension menu. Press `Ctrl`+`Shift`+`X` and in the menu, click `Install from VSIX...`.

## Add new tenant

The extension supports several tenants.

Open the **Command Palette** with `Ctrl+Shift+P` (Windows or Linux) or `Cmd+Shift+P` (macOS) to find the command "IdentityNow: Add tenant...".

Alternatively, you can click on the `+` in the SailPoint view.

You can add a tenant by using a Personal Access Token (PAT) or by using a short-lived access token (like one you can get from https://yourtenant.identitynow.com/ui/session.

![Add tenant](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/add-tenant.gif)

It is also possible to add a tenant by using the following URIs:
`vscode://yannick-beot-sp.vscode-sailpoint-identitynow/addtenant?tenantName=company&accessToken=eyJh...&authenticationMethod=AccessToken` or 
`vscode://yannick-beot-sp.vscode-sailpoint-identitynow/addtenant?tenantName=company&clientId=806c451e057b442ba67b5d459716e97a&clientSecret=***&authenticationMethod=PersonalAccessToken`.

## Import and export the config of a tenant

In the **SailPoint view**, right-click on a tenant to import or export config.

![Import/export config](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/import-export-treeview.png)

You can also export a single source, rule, identity profile or transform by right-clicking it and choosing "Export sp-config...".

![Import/export config](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/export-node.png)

Or, from the **Command Palette**, find the command "IdentityNow: Import config..." or "IdentityNow: Export config...".

![Import/export config](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/import-export-palette.png)

![Export config](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/export-config.gif)

Finally, you can right-click a JSON file in the explorer to import it.

![Import/export config](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/import-file.png)

## Rule management

The extension allows you to manage rules and upload the script to a new or existing rule:

![Export config](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/rules-management.gif)

## Workflow management

The extension allows you to test the workflow:

![Export config](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/test-workflow.gif)

## Snippets

![Snippets for transforms](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-identitynow/main/resources/readme/snippet-transforms.gif)

### Transforms

This extension includes the following snippets for transforms:

| Trigger            | Content                          |
| ------------------ | -------------------------------- |
| `tr-acc`           | Account Attribute                |
| `tr-b64-dec`       | Base64 Decode                    |
| `tr-b64-enc`       | Base64 Encode                    |
| `tr-concat`        | Concatenation                    |
| `tr-cond`          | Conditional                      |
| `tr-date-comp`     | Date Compare                     |
| `tr-date-format`   | Date Format                      |
| `tr-date-math`     | Date Math                        |
| `tr-diacritic`     | Decompose Diacritial Marks       |
| `tr-phone`         | E164 Phone                       |
| `tr-first`         | First Valid                      |
| `tr-rand-string`   | Generate Random String           |
| `tr-end`           | Get End of String                |
| `tr-refattr`       | Get Reference Identity Attribute |
| `tr-id`            | Identity Attribute               |
| `tr-indexof`       | Index Of                         |
| `tr-iso3166`       | ISO3166                          |
| `tr-last-index`    | Last Index Of                    |
| `tr-leftpad`       | Left Pad                         |
| `tr-lookup`        | Lookup                           |
| `tr-lower`         | Lower                            |
| `tr-norm`          | Name Normalizer                  |
| `tr-rand-alphanum` | Random Alphanumeric              |
| `tr-rand-num`      | Random Numeric                   |
| `tr-ref`           | Reference                        |
| `tr-replace`       | Replace                          |
| `tr-replace-all`   | Replace All                      |
| `tr-rightpad`      | Right Pad                        |
| `tr-rule`          | Rule                             |
| `tr-split`         | Split                            |
| `tr-static`        | Static                           |
| `tr-sub`           | Substring                        |
| `tr-trim`          | Trim                             |
| `tr-upper`         | Upper                            |
| `tr-uuid`          | UUID Generator                   |

### Schema

This extension includes the following snippets for schemas:

| Trigger         | Content             |
| --------------- | ------------------- |
| `New schema`    | Create a new schema |
| `New attribute` | Add new attribute   |

### Provisioning Policies

This extension includes the following snippets for schemas:

| Trigger                   | Content                          |
| ------------------------- | -------------------------------- |
| `New provisioning policy` | Create a new provisioning policy |
| `New field`               | Create a new field               |

## Extension Settings

At this moment, there is no configuration settings for this extension.

## Known Issues

None

## Release Notes

### 0.0.18

- Export was not creating folders recursively
- Update schema for identity profiles, life cycle states, and provisioning policies
- Update regexp for tenant name for short names

### 0.0.17

- Update length limit for connector rule names and provisioning policy name
- Update regexp for tenant name
- Fix TLS error when trying to get an access token

### 0.0.16

Almost Christmas!

- Capability to export a single source, rule, transform or identity profile from the tree view
- Capability to refine export from the command palette or from a tenant in the tree view
- Capability to import a sp-config
- Can refresh identities under an identity profile (cf. [#30](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/30))
- Fix error when exporting to file (cf. [#35](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/35))

### 0.0.15

- Add supports for Service Desk Integrations (@fernando-delosrios-sp)
- Fix supports of UTF-8 values in transform (cf. [#33](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/33))

### 0.0.14

- Add 2 commands for sources: reset accounts and reset entitlements
- Add support for Identity Profiles
- Pagination for sources (cf. [#25](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/25))

### 0.0.13

- Regression on transform evaluation (cf. [#20](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/20))

### 0.0.12

- Possibility to add a tenant with an access token (cf. [#18](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/18))
- The extension have an URI handler (cf. [#17](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/17)). If a URL with the following format is called in the system, a tenant is added or updated: vscode://yannick-beot-sp.vscode-sailpoint-identitynow/addtenant?tenantName=XXX&accessToken=eyJh...&authenticationMethod=AccessToken

### 0.0.11

- Can rename tenant display name (cf. [#12](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/12))

### 0.0.9

- Support for connector rules: creation, deletion, update, export, import
- Aggregation without optimization was not working properly

### 0.0.8

Transforms for ever!

- New transforms (E.164 Phone, Random Alphanumeric Random Numeric,  Replace All, Rule, UUID Generator), cf. [#8](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/pull/8)
- [#6](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/issues/6) update regexp for transform names

### 0.0.7

Transforms are the best!

Added:
- Add step to creation of transform to have a non-empty file
- If only 1 tenant, automatically selected in the workflow tester
- Added refresh buttons in the view
- Add the capacity to evaluate transforms [#7](https://github.com/yannick-beot-sp/vscode-sailpoint-identitynow/pull/7) thanks to @cristian-grau-sp

### 0.0.6

Fixed:
- Regexp for provisioning policy
- Issue #3 with new transform

### 0.0.5

Fixed:
- Regexp for tenant, with or without domain
- Remove PAT when removing tenant

### 0.0.4

Fix regexp for PAT secret

### 0.0.3 

Workflows for ever!

- Export of tenant config
- Add support for workflows
- Add workflow tester

### 0.0.2

Let's make transform great again!

- Add support for source schemas
- Add support for provision policies
- Add schema and snippets for source schemas
- Add schema and snippets for provisioning policies
- Add snippets for transforms

### 0.0.1

Initial internal release

- Add tenant with Personal Access Token (PAT) authentication
- Remove tenant
- Open Sources and Transforms
- Save Sources and Transforms
- Create Transform
- Remove Transform
