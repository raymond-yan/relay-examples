import * as React from "react";
import { graphql } from "relay-runtime";
import { useFragment, usePaginationFragment, useRefetchableFragment } from "react-relay";
import type { StoryCommentsSectionFragment$key } from "./__generated__/StoryCommentsSectionFragment.graphql";
import Comment from "./Comment";
import LoadMoreCommentsButton from "./LoadMoreCommentsButton";
import StoryCommentsComposer from "./StoryCommentsComposer";

const { useState, useTransition } = React;

export type Props = {
  story: StoryCommentsSectionFragment$key;
};

const StoryCommentsSectionFragmentQueryName = 'StoryCommentsSection_comments';

const StoryCommentsSectionFragment = graphql`
  fragment StoryCommentsSectionFragment on Story
    @refetchable(queryName: "StoryCommentsSectionRefetchQuery") 
    @argumentDefinitions(
      cursor: { type: "String"}
      count: { type: "Int", defaultValue: 3}
    )
   {
    comments(first: $count, after: $cursor) 
    @connection(key: "StoryCommentsSection_comments") 
    {
      pageInfo {
        startCursor,
        hasNextPage,
      }
      edges {
        node {
          id
          ...CommentFragment
        }
      }
    }
    ...StoryCommentsComposerFragment
  }
`;

export default function StoryCommentsSection({ story }: Props) {
  const {data, loadNext} = usePaginationFragment(StoryCommentsSectionFragment, story);
  const [isPending, startTransition] = useTransition();

  const onLoadMore = () => startTransition(() => { loadNext(3) });
  return (
    <div>
      <StoryCommentsComposer story={data} connectionId={StoryCommentsSectionFragmentQueryName} />
      {data.comments.edges.map((edge) => (
        <Comment key={edge.node.id} comment={edge.node} />
      ))}
       {data.comments.pageInfo.hasNextPage && (
        <LoadMoreCommentsButton disabled={isPending} onClick={onLoadMore} />
      )}
      {isPending && <div>Loading...</div>}
    </div>
  );
}
