interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasicAndBackground extends CoursePartBase {
  description: string;
}

interface CoursePartRequirement extends CoursePartBasicAndBackground {
  requirements: string[];
  kind: "special";
}



interface CoursePartBasic extends CoursePartBasicAndBackground {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBasicAndBackground {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement;