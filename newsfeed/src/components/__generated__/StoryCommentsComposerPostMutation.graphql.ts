/**
 * @generated SignedSource<<e6c84456333abe82714e4428f0d38be7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoryCommentsComposerPostMutation$variables = {
  connections: ReadonlyArray<string>;
  id: string;
  text: string;
};
export type StoryCommentsComposerPostMutation$data = {
  readonly postStoryComment: {
    readonly commentEdge: {
      readonly node: {
        readonly id: string;
        readonly text: string | null;
      } | null;
    } | null;
    readonly story: {
      readonly " $fragmentSpreads": FragmentRefs<"StoryCommentsComposerFragment">;
    } | null;
  } | null;
};
export type StoryCommentsComposerPostMutation = {
  response: StoryCommentsComposerPostMutation$data;
  variables: StoryCommentsComposerPostMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "text"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "text",
    "variableName": "text"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "CommentsConnectionEdge",
  "kind": "LinkedField",
  "name": "commentEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Comment",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "StoryCommentsComposerPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "StoryCommentMutationResponse",
        "kind": "LinkedField",
        "name": "postStoryComment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Story",
            "kind": "LinkedField",
            "name": "story",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "StoryCommentsComposerFragment"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "StoryCommentsComposerPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "StoryCommentMutationResponse",
        "kind": "LinkedField",
        "name": "postStoryComment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Story",
            "kind": "LinkedField",
            "name": "story",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "commentEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "29572eecf8eaf361844784e6dc58e2c3",
    "id": null,
    "metadata": {},
    "name": "StoryCommentsComposerPostMutation",
    "operationKind": "mutation",
    "text": "mutation StoryCommentsComposerPostMutation(\n  $id: ID!\n  $text: String!\n) {\n  postStoryComment(id: $id, text: $text) {\n    story {\n      ...StoryCommentsComposerFragment\n      id\n    }\n    commentEdge {\n      node {\n        id\n        text\n      }\n    }\n  }\n}\n\nfragment StoryCommentsComposerFragment on Story {\n  id\n}\n"
  }
};
})();

(node as any).hash = "c7604ce5bcade8a37b1db564e127c84b";

export default node;
