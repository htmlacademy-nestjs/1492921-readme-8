import {
  Entity,
  Post,
  PostState,
  PostType,
  StorableEntity,
} from '@project/shared-core';
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

  public name: string; // заполняется для Video, Text
  public url: string; // заполняется для Video, Photo, Link
  public preview: string; // заполняется для Text
  public text: string; // заполняется для Text
  public quoteText: string; // заполняется для Quote
  public quoteAuthor: string; // заполняется для Quote
  public description: string; // заполняется для Link

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.postType = post.postType;
    this.authorId = post.authorId;
    this.isRepost = this.repostId || null ? true : false;
    this.repostId = post.repostId || null;
    this.repostAuthorId = post.repostAuthorId || null;
    this.tags = post.tags ?? [];
    this.state =
      !post.publicationDate || post.publicationDate > new Date()
        ? 'draft'
        : 'published';
    this.createDate = post.createDate ?? new Date();
    this.publicationDate = post.publicationDate ?? null;
    this.likesCount = post.likesCount ?? 0;
    this.commentsCount = post.commentsCount ?? 0;

    this.name = post.name || null;
    this.url = post.url || null;
    this.preview = post.preview || null;
    this.text = post.text || null;
    this.quoteAuthor = post.quoteAuthor || null;
    this.quoteText = post.quoteText || null;
    this.description = post.description || null;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      postType: this.postType,
      authorId: this.authorId,
      isRepost: this.repostId || null ? true : false,
      repostId: this.repostId,
      repostAuthorId: this.repostAuthorId,
      tags: this.tags,
      state:
        !this.publicationDate || this.publicationDate > new Date()
          ? 'draft'
          : 'published',
      createDate: this.createDate,
      publicationDate: this.publicationDate,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      name: this.name,
      url: this.url,
      preview: this.preview,
      text: this.text,
      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,
      description: this.description,
      //comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    };
  }
}
