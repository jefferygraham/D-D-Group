export class Campaign {
    id: string = '';
    campaignName: string = '';
    DM: string = '';
    players: string[] = [];
    notes: Note[] = [];
}

export interface Note {
    from: string;
    message: string;
}