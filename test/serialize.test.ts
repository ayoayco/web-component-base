import { describe, expect, test } from "vitest";
import { serialize } from "../src/utils/serialize.mjs";

describe("serialize", () => {
  test("should stringify number", () => {
    const result = serialize(3);
    expect(result).toBeTypeOf("string");
    expect(result).toEqual("3");
  });

  test("should stringify boolean", () => {
    const result = serialize(false);
    expect(result).toBeTypeOf("string");
    expect(result).toEqual("false");
  });

  test("should stringify object", () => {
    const result = serialize({ hello: "world" });
    expect(result).toBeTypeOf("string");
    expect(result).toEqual('{"hello":"world"}');
  });

  test("should return undefined", () => {
    const result = serialize(undefined);
    expect(result).toBeUndefined();
  });
});
