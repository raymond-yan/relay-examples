import * as React from "react";
import Image from "./Image";
import { commitLocalUpdate, graphql } from "relay-runtime";
import { useFragment, useRelayEnvironment } from "react-relay";


import type { ContactRowFragment$key } from "./__generated__/ContactRowFragment.graphql";

export type Props = {
  contact: ContactRowFragment$key;
};

const ContactRowFragment = graphql`
  fragment ContactRowFragment on Actor {
    id,
    name
    profilePicture {
      ...ImageFragment
    }
    ... on Person {
      note {
        id,
        title,
        body
      }
    }
  }
`;

export default function ContactRow({ contact }: Props): React.ReactElement {
  const data = useFragment(ContactRowFragment, contact);
  const environment  = useRelayEnvironment();
  const commitUpdate = () =>{
    /** how to commit local changes!!!! */
    commitLocalUpdate(environment , store => {
      //! get the local id by the data.id, since every node in the graphQL graph has a unique id
      const person = store.get(data.id);
      const note = person.getOrCreateLinkedRecord('note', 'Note');
      note.setValue('New Title', 'title');
    })
  }
  return (
    <div className="contactRow" onClick={() => commitUpdate()}>
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="contactRow__image"
      />
      <div className="contactRow__name">{data.name}</div>
      {data.note?.title &&  <div className="contactRow__name">{data.note.title}</div>}
    </div>
  );
}
