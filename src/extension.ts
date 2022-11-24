import * as vscode from "vscode";

import { getTopStoriesData } from "./api";
import getExtension from "./getExtension";
import provider from "./provider";
import templateHTML from "./templates/html";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("vsc-hn.startVscHn", async () => {
    const languageChoice = await vscode.window.showQuickPick(["HTML"], {
      placeHolder: "Select the language your want your HN formatted in.",
    });
    const extension = getExtension(languageChoice);

    const topStoriesFinal = await getTopStoriesData();

    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider(
        "vsc-hn",
        provider(
          templateHTML({
            stories: topStoriesFinal,
          })
        )
      )
    );
    const uri = vscode.Uri.parse(`vsc-hn:vsc-hn.${extension}`);
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
  });
}

export function deactivate() {}
