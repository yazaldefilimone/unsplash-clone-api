export class AlreadyExistsError extends Error {
  constructor(param: string) {
    super(`This [${param}] is already exists.`);
    this.name = "AlreadyExistsError";
  }
}
