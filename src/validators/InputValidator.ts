import { z } from "zod";
import { ValidationError } from "../core/Errors";

export class InputValidator {
  private static schema = z.string().min(1).max(500);

  public static validate(input: any): string {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new ValidationError(
        `Invalid input: ${result.error.issues.map((i) => i.message).join(", ")}`
      );
    }

    return result.data;
  }
}
