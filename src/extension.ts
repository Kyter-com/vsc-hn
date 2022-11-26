import * as vscode from "vscode";

import { getTopStoriesData } from "./api";
import getExtension from "./getExtension";
import provider from "./provider";
import templateHTML from "./templates/html";

let languageChoiceState: string | undefined = undefined;
let extensionState: string | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("vsc-hn.startVscHn", async () => {
    const languageChoice = await vscode.window.showQuickPick(["HTML"], {
      placeHolder: "Select the language your want your HN formatted in.",
    });
    const extension = getExtension(languageChoice);
    languageChoiceState = languageChoice;
    extensionState = extension;

    const topStories = await getTopStoriesData();

    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider(
        "vsc-hn",
        provider(
          templateHTML({
            stories: topStories,
          })
        )
      )
    );
    const uri = vscode.Uri.parse(`vsc-hn:vsc-hn.${extension}`);
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("vsc-hn.refresh", async () => {
      if (!vscode.window.activeTextEditor) {
        console.log("No editor");
        return; // no editor
      }
      const { document } = vscode.window.activeTextEditor;
      if (document.uri.scheme !== "vsc-hn") {
        console.log("No scheme");
        return; // not my scheme
      }

      const topStories = await getTopStoriesData();

      context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider(
          "vsc-hn",
          provider(
            templateHTML({
              stories: topStories,
            })
          )
        )
      );
      console.log("Refresh for extension", extensionState);
      const uri = vscode.Uri.parse(`vsc-hn:vsc-hn.${extensionState}`);
      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc);
    })
  );
}

export function deactivate() {}
