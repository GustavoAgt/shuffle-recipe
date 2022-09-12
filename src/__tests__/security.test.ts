import { hashPassword, verifyPassword } from "./../utils/security.handle";

describe("Testing security.handle.ts", () => {
  const MOCKED_PWD = "test123456";
  let hashedPwd = "";

  beforeEach(async () => {
    hashedPwd = await hashPassword(MOCKED_PWD);
  });

  test("should hash password func", () => {
    expect(hashedPwd).not.toEqual(MOCKED_PWD);
  });

  test("should verify password func (Truthy)", async () => {
    expect.assertions(1);

    const isPwdVerfied = await verifyPassword(MOCKED_PWD, hashedPwd);
    expect(isPwdVerfied).toBeTruthy();
  });

  test("should verify password func", async () => {
    expect.assertions(1);

    const isPwdVerfied = await verifyPassword(`${MOCKED_PWD}wrong`, hashedPwd);
    expect(isPwdVerfied).not.toBeTruthy();
  });
});
