import {
  Entity,
  Post,
  PostState,
  PostType,
  StorableEntity,
} from '@project/shared-types';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public postType: PostType;
  public authorId: string;
  public isRepost: boolean; // Избыточно
  public repostId: string;
  public repostAuthorId: string; // Избыточно
  public tags: string[];
  public state: PostState; // Избыточно
  public createDate: Date;
  public publicationDate: Date;
  public likesCount: number; // Избыточно
  public commentsCount: number; // Избыточно

  public name: string; // заполняется для VideoPost, TextPost
  public url: string; // заполняется для VideoPost, PhotoPost, LinkPost
  public preview: string; // заполняется для TextPost
  public text: string; // заполняется для TextPost
  public quoteAuthorId: string; // заполняется для QuotePost
  public quoteText: string; // заполняется для QuotePost
  public description: string; // заполняется для LinkPost

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.postType = post.postType;
    this.authorId = post.authorId;
    this.isRepost = post.isRepost;
    this.repostId = post.repostId ?? '';
    this.repostAuthorId = post.repostAuthorId ?? '';
    this.tags = post.tags ?? [];
    this.state = post.state;
    this.createDate = post.createDate;
    this.publicationDate = post.publicationDate;
    this.likesCount = post.likesCount ?? 0;
    this.commentsCount = post.commentsCount ?? 0;

    this.name = post.name ?? '';
    this.url = post.url ?? '';
    this.preview = post.preview ?? '';
    this.text = post.text ?? '';
    this.quoteAuthorId = post.quoteAuthorId ?? '';
    this.quoteText = post.quoteText ?? '';
    this.description = post.description ?? '';
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      postType: this.postType,
      authorId: this.authorId,
      isRepost: this.isRepost,
      repostId: this.repostId,
      repostAuthorId: this.repostAuthorId,
      tags: this.tags,
      state: this.state,
      createDate: this.createDate,
      publicationDate: this.publicationDate,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      name: this.name,
      url: this.url,
      preview: this.preview,
      text: this.text,
      quoteAuthorId: this.quoteAuthorId,
      quoteText: this.quoteText,
      description: this.description,
    };
  }
}
