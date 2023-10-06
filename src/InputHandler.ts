import readline from 'readline';

interface ValidationOptions {
  minLength?: number;
}

/**
 * Helper class to read user input from stdin
 */
class InputHandler {
  /**
   * Create a new readline instance.
   * @returns {readline.Interface} readline instance.
   */
  private static createReader(): readline.Interface {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Prompt the user to input a string.
   *
   * @param {string} prompt The prompt to display to the user.
   * @returns {Promise<string>} A promise that resolves with the user's input, trimmed.
   */
  public static getInput(prompt: string): Promise<string> {
    const reader = this.createReader();

    return new Promise((resolve) => {
      reader.question(prompt + ' ', (answer) => {
        resolve(answer.trim());
        reader.close();
      });
    });
  }

  /**
   * Prompts the user to input a string, returning the value only once it is valid.
   * @param {string} prompt The prompt to display the user.
   * @param {ValidationOptions} options
   * @returns {Promise<string>} A promise that resolves with the user's input, trimmed.
   */
  public static async getValidatedInput(
    prompt: string,
    options: ValidationOptions
  ): Promise<string> {
    let input: string;

    do {
      input = await this.getInput(prompt);

      if (options.minLength !== undefined && input.length < options.minLength) {
        console.error(
          `Input is too short. Minimum length is ${options.minLength}`
        );
        continue;
      }

      return input;
    } while (true);
  }
}

export default InputHandler;
