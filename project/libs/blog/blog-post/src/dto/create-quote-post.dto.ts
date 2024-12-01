export class CreateQuotePostDto {
  public repostId?: string;
  public tags?: string[];
  public quoteAuthorId: string;
  public quoteText: string;
}
