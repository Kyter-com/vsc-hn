import * as vscode from "vscode";

import provider from "./provider";

// Utils
import getExtension from "./getExtension";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("vsc-hn.startVscHn", async () => {
    const languageChoice = await vscode.window.showQuickPick(["HTML"]);
    const extension = getExtension(languageChoice);
    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider(
        "vsc-hn",
        provider(`Hey from ${extension} provider!`)
      )
    );
    const uri = vscode.Uri.parse(`vsc-hn:vsc-hn.${extension}`);
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
  });
}

export function deactivate() {}
