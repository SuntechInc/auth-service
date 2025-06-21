export type Result<R, L> = { ok: true; value: R } | { ok: false; error: L };

export const ok = <R, L = never>(value: R): Result<R, L> => ({ ok: true, value });
export const err = <R = never, L = unknown>(error: L): Result<R, L> => ({ ok: false, error });
