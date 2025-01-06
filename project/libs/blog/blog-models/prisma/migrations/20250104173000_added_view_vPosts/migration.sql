-- CreateView
CREATE VIEW v_posts
AS
SELECT p.id,
  p.post_type,
  p.author_id,
  p.repost_id,
  r.author_id AS repost_author_id,
	array_agg(t."B") as tags,
  p.create_date,
  p.publication_date,
  p.likes_count,
  p.comments_count,
  p.name,
  p.url,
  p.preview,
  p.text,
  p.quote_author,
  p.quote_text,
  p.description
FROM posts p
  LEFT JOIN posts r ON p.repost_id = r.id
  LEFT JOIN "_PostToTag" t ON t."A" = p.id
GROUP BY
  p.id,
  p.post_type,
  p.author_id,
  p.repost_id,
  r.author_id,
  p.create_date,
  p.publication_date,
  p.likes_count,
  p.comments_count,
  p.name,
  p.url,
  p.preview,
  p.text,
  p.quote_author,
  p.quote_text,
  p.description
;
