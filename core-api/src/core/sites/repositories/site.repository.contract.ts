import { beforeEach, describe, expect, it } from "vitest";
import { SiteRepository } from "./site.repository.ts";
import { RepoCreateSiteInput, SiteStatus } from "../site.types.ts";

export const runSiteRepositoryContract = (
  implementationName: string,
  createRepo: () => SiteRepository,
) => {
  describe(`Site Repository Contract: ${implementationName}`, () => {
    let repo: SiteRepository;

    const baseInput: RepoCreateSiteInput = {
      siteName: "Safe Site",
      siteUrl: "https://safe-site.org",
      adminEmail: "safe@usd21.org",
      publicKey: "public key stuff",
      status: SiteStatus.Active,
    };

    beforeEach(() => {
      repo = createRepo();
    });

    it("should not throw SiteAlreadyExistsError on SQL Injection Attempt", async () => {
      await repo.create(baseInput);

      const attackUrl = baseInput.siteUrl +
        "' OR '1' = '1'";
      const attackInput: RepoCreateSiteInput = {
        ...baseInput,
        siteUrl: attackUrl,
      };

      await expect(repo.create(attackInput)).resolves.toBeDefined();
    });
  });
};
