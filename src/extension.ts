import * as vscode from "vscode";

import getExtension from "./getExtension";
import getStoriesByType from "./utils/getStoriesByType";
import provider from "./provider";
import templateHTML from "./templates/html";

let languageChoiceState: string | undefined = undefined;
let extensionState: string | undefined = undefined;
let storyTypeState: string = "Top";
let refreshState: number = 0;

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("vsc-hn.startVscHn", async () => {
    const languageChoice = await vscode.window.showQuickPick(["HTML"], {
      placeHolder: "Select the language your want your HN formatted in.",
    });
    const extension = getExtension(languageChoice);
    const storyType = await vscode.window.showQuickPick(["Top", "New", "Ask"], {
      placeHolder: "Select the type of stories you want to see.",
    });

    languageChoiceState = languageChoice;
    extensionState = extension;
    storyTypeState = storyType || "Top";

    const stories = await getStoriesByType(storyTypeState);

    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider(
        "vsc-hn",
        provider(
          templateHTML({
            stories,
          })
        )
      )
    );
    const uri = vscode.Uri.parse(`vsc-hn:vsc-hn.${extension}`);
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc, {
      preview: false,
    });
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("vsc-hn.refresh", async () => {
      if (!vscode.window.activeTextEditor) {
        return; // no editor
      }
      const { document } = vscode.window.activeTextEditor;
      if (document.uri.scheme !== "vsc-hn") {
        return; // not my scheme
      }
      vscode.commands.executeCommand("workbench.action.closeActiveEditor");
      const stories = await getStoriesByType(storyTypeState);
      context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider(
          "vsc-hn",
          provider(
            templateHTML({
              stories: stories,
            })
          )
        )
      );
      const uri = vscode.Uri.parse(
        `vsc-hn:vsc-hn-${(refreshState += 1)}.${extensionState}`
      );
      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc, {
        preview: false,
      });
    })
  );
}

export function deactivate() {}
