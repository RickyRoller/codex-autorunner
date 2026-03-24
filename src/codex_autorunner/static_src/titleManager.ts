const BASE_TITLE = "CAR";
const INACTIVE_TITLE_HUB = "Codex Autorunner";
const ACTIVE_TITLE_HUB = `${BASE_TITLE} | Running...`;

function isWorkingStatus(status: string | null | undefined): boolean {
  const normalized = String(status || "").trim().toLowerCase();
  return (
    normalized === "pending" ||
    normalized === "running" ||
    normalized === "stopping"
  );
}

function extractTicketNumber(ticketPath: string | null | undefined): string | null {
  const match = String(ticketPath || "").match(/TICKET-(\d+)/);
  return match?.[1] || null;
}

class TitleManager {
  private view: "hub" | "repo" = "hub";
  private hubHasWorkingRepo = false;
  private repoName: string | null = null;
  private repoTicketNumber: string | null = null;
  private repoFlowWorking = false;

  setHubView(): void {
    this.view = "hub";
    this.sync();
  }

  setHubWorking(hasWorkingRepo: boolean): void {
    this.hubHasWorkingRepo = hasWorkingRepo;
    this.sync();
  }

  setRepoView(repoName: string | null | undefined): void {
    const trimmed = String(repoName || "").trim();
    this.view = "repo";
    this.repoName = trimmed || null;
    this.sync();
  }

  setRepoTicket(ticketPath: string | null | undefined, flowStatus: string | null | undefined): void {
    this.repoTicketNumber = extractTicketNumber(ticketPath);
    this.repoFlowWorking = isWorkingStatus(flowStatus);
    this.sync();
  }

  private sync(): void {
    if (typeof document === "undefined") return;
    if (this.view === "repo" && this.repoName) {
      if (this.repoFlowWorking && this.repoTicketNumber) {
        document.title = `Building #${this.repoTicketNumber} | ${this.repoName}`;
        return;
      }
      document.title = `${BASE_TITLE} | ${this.repoName}`;
      return;
    }
    document.title = this.hubHasWorkingRepo ? ACTIVE_TITLE_HUB : INACTIVE_TITLE_HUB;
  }
}

export const titleManager = new TitleManager();
