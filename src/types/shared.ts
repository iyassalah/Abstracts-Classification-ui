export interface IAbstract {
    title: string;
    author: string;
    abstract: string;
    labels: Array<{
        label: string;
        prob: number;
    }>;
}