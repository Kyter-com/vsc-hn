import * as vscode from "vscode";

import getExtension from "./utils/getExtension";
import getStoriesByType from "./utils/getStoriesByType";
import provider from "./provider";
import templateByType from "./utils/templateByType";

let languageChoiceState: string;
let extensionState: string;
let storyTypeState: string;
let refreshState = 0;

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("vsc-hn.startVscHn", async () => {
    const languageChoice = await vscode.window.showQuickPick(
      ["HTML", "JavaScript"],
      {
        placeHolder: "Select the language your want your HN formatted in.",
      }
    );
    const extension = getExtension(languageChoice);
    const storyType = await vscode.window.showQuickPick(["Top", "New", "Ask"], {
      placeHolder: "Select the type of stories you want to see.",
    });

    // Don't launch extension if no choices are made
    if (!(storyType && languageChoice)) {
      return;
    }

    languageChoiceState = languageChoice;
    extensionState = extension;
    storyTypeState = storyType;

    const stories = await getStoriesByType(storyTypeState);
    const template = templateByType(
      languageChoiceState,
      stories,
      storyTypeState
    );

    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider(
        "vsc-hn",
        provider(template)
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
      const template = templateByType(
        languageChoiceState,
        stories,
        storyTypeState
      );
      context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider(
          "vsc-hn",
          provider(template)
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
