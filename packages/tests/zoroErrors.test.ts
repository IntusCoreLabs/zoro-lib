import { describe, it, expect, vi, beforeEach } from "vitest";
import { ZoroServices } from "../example/api.ts";

describe("ZoroServices", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("getOne must return a user correctly", async () => {
    const mockUser = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: { lat: "-37.3159", lng: "81.1496" },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as Response);

    const user = await ZoroServices.getOne();

    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/users/1"), expect.any(Object));
  });

  it("getAll should return a list of users", async () => {
    const mockUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    } as Response);

    const users = await ZoroServices.getAll();

    expect(users).toHaveLength(2);
    expect(users[0].name).toBe("User 1");
  });
});
