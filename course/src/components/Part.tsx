import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((part) => {
    switch (part.kind) {
      case "basic":
        return (
          <div key={part.name}>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>
              <i>{part.description}</i>
            </p>
          </div>
        );
      case "group":
        return (
          <div key={part.name}>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>project exercises {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div key={part.name}>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>
              <i>{part.description}</i>
            </p>
            <p>submit to: {part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div key={part.name}>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>
              <i>{part.description}</i>
            </p>
            <p>required skills: {part.requirements[0]} , {part.requirements[1]}</p>
          </div>
        );
      default:
        return <div>{assertNever(part)}</div>;
    }
  });
};

export default Part;
