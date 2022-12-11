import ejs from "ejs";
import path from "path";
import { minify } from "html-minifier";

/**
 * It takes in a link and a message and returns a string of HTML
 * @param {string} link - The link to the reset password page.
 * @param {string} message - The message to be displayed to the user.
 * @returns A function that takes in two arguments, link and message, and returns a promise that
 * resolves to a string.
 */
export const resetPasswordHtmlRender = async (
  link: string,
  message: string,
) => {
  const response = await ejs.renderFile(
    path.resolve(__dirname, "resetPassword.ejs"),
    {
      resetLink: link,
      message,
    },
  );
  return minify(response, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    preserveLineBreaks: false,
    quoteCharacter: `'`,
    sortClassName: true,
  });
};
