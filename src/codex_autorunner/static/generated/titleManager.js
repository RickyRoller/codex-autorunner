// GENERATED FILE - do not edit directly. Source: static_src/
const BASE_TITLE = "CAR";
const INACTIVE_TITLE_HUB = "Codex Autorunner";
const ACTIVE_TITLE_HUB = `${BASE_TITLE} | Running...`;
function isWorkingStatus(status) {
    const normalized = String(status || "").trim().toLowerCase();
    return (normalized === "pending" ||
        normalized === "running" ||
        normalized === "stopping");
}
function extractTicketNumber(ticketPath) {
    const match = String(ticketPath || "").match(/TICKET-(\d+)/);
    return match?.[1] || null;
}
class TitleManager {
    constructor() {
        this.view = "hub";
        this.hubHasWorkingRepo = false;
        this.repoName = null;
        this.repoTicketNumber = null;
        this.repoFlowWorking = false;
    }
    setHubView() {
        this.view = "hub";
        this.sync();
    }
    setHubWorking(hasWorkingRepo) {
        this.hubHasWorkingRepo = hasWorkingRepo;
        this.sync();
    }
    setRepoView(repoName) {
        const trimmed = String(repoName || "").trim();
        this.view = "repo";
        this.repoName = trimmed || null;
        this.sync();
    }
    setRepoTicket(ticketPath, flowStatus) {
        this.repoTicketNumber = extractTicketNumber(ticketPath);
        this.repoFlowWorking = isWorkingStatus(flowStatus);
        this.sync();
    }
    sync() {
        if (typeof document === "undefined")
            return;
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
