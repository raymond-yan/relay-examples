import * as React from "react";

export type Props = {
  person: { name: string; picture: string };
};

export default function PersonalByline({ person }: Props): React.ReactElement {
  return (
    <div className="person">
      <picture>
        <img className="person__image" src={person.picture} alt={person.name} />
      </picture>
      <div className="person__name">{person.name}</div>
    </div>
  );
}