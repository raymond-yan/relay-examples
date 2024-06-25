import * as React from "react";
import Story from "./Story";
import { OperationType, graphql } from "relay-runtime";
import { useFragment, useLazyLoadQuery, usePaginationFragment } from "react-relay";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import { NewsfeedContentsFragment$data, NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";

const NewsfeedQuery = graphql`
    query NewsfeedQuery {
      viewer {
       ...NewsfeedContentsFragment
      }
    }
`;

const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Viewer 
  @refetchable(queryName: "NewsfeedContentsRefetchQuery")
  @argumentDefinitions(
    cursor: { type: "String"}
    count: { type: "Int", defaultValue: 3}
  )
   {
    newsfeedStories (first: $count, after: $cursor) 
      @connection(key: "NewsfeedContents_newsfeedStories")
     {
      pageInfo {
        startCursor,
        hasNextPage,
      }
      edges {
        node {
          id
          ...StoryFragment
        }
      }
    }
  }
`


export default function Newsfeed() {
  const queryData  = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  // const {data, loadNext} = usePaginationFragment(NewsfeedContentsFragment, queryData.viewer)
  // const stories = data;
  const {data, loadNext, isLoadingNext} = usePaginationFragment<OperationType, NewsfeedContentsFragment$key>(NewsfeedContentsFragment, queryData.viewer);
  const stories = data.newsfeedStories.edges.map(edge => edge.node);
  const pageInfo = data.newsfeedStories.pageInfo;
  const loadMore = () => loadNext(3);


  return (
    <div className="newsfeed">
      {stories.map(story => <Story key={story.id} story={story} />)}
      <InfiniteScrollTrigger hasNext={pageInfo.hasNextPage} onEndReached={loadMore} isLoadingNext={isLoadingNext}/>
    </div>
  );
}
