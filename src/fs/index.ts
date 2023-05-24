export const __internals = {
  files: new Map<string, string>(),
};

type Callback = (err?: Error) => any;
type ReadFileCallback = (err?: Error, data?: string) => any;

export const constants = {
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
};

export const access = (
  path: string,
  maybeModeOrCallback: number | Callback,
  maybeCallback?: Callback
) => {
  let mode, callback;

  if (maybeCallback !== undefined) {
    callback = maybeCallback;
    mode = maybeModeOrCallback;
  } else {
    callback = maybeModeOrCallback;
  }

  // mode is fs.constants.F_OK or a mask of R_OK, W_OK and X_OK
  // we ignore mode for now

  if (!__internals.files.has(path)) {
    callback(new Error("File does not exist"));
    return;
  }

  callback();
};

export interface WriteFileOptions {
  encoding?: string;
  mode?: number;
  flag?: string;
  signal?: any;
}

export const writeFile = (
  file: string,
  data: string,
  maybeOptionsOrCallback: WriteFileOptions | Callback,
  maybeCallback?: Callback
) => {
  let options, callback;

  if (maybeCallback !== undefined) {
    callback = maybeCallback;
    options = maybeOptionsOrCallback;
  } else {
    callback = maybeOptionsOrCallback;
  }

  // @todo check write permission, use options
  __internals.files.set(file, data);
  callback();
};

export interface ReadFileOptions {
  encoding?: string;
  flag?: string;
  signal?: any;
}

export const readFile = (
  path: string,
  maybeOptionsOrCallback: ReadFileOptions | Callback,
  maybeCallback?: Callback
) => {
  let options, callback;

  if (maybeCallback !== undefined) {
    callback = maybeCallback;
    options = maybeOptionsOrCallback;
  } else {
    callback = maybeOptionsOrCallback;
  }

  // @todo check read permission, use options
  if (!__internals.files.has(path)) {
    callback(new Error("File does not exist"));
    return;
  }

  callback(undefined, __internals.files.get(path));
};

export const unlink = (path: string, callback: Callback) => {
  // @todo check permission
  // @todo should this error if the path doesnt exist?
  __internals.files.delete(path);
  callback();
};
