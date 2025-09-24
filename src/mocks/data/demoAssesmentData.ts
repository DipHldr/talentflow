import type { CreatedAssesment } from "../types/assesment"; // Adjust the import path as needed

export const demoAssessments: CreatedAssesment[] = [
  {
    id: 101,
    title: "React Fundamentals",
    topics: ["React", "JSX", "Hooks", "State Management"],
    numberOfQuestions: 10,
    duration: 15, // in minutes
    questionIds: [
      "react_q_1", "react_q_2", "react_q_3", "react_q_4", "react_q_5",
      "react_q_6", "react_q_7", "react_q_8", "react_q_9", "react_q_10"
    ],
  },
  {
    id: 102,
    title: "Node.js Essentials",
    topics: ["Node.js", "Express", "Async", "Modules"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "node_q_1", "node_q_2", "node_q_3", "node_q_4", "node_q_5",
      "node_q_6", "node_q_7", "node_q_8", "node_q_9", "node_q_10"
    ],
  },
  {
    id: 103,
    title: "TypeScript Basics",
    topics: ["TypeScript", "Types", "Interfaces", "Generics"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "ts_q_1", "ts_q_2", "ts_q_3", "ts_q_4", "ts_q_5",
      "ts_q_6", "ts_q_7", "ts_q_8", "ts_q_9", "ts_q_10"
    ],
  },
  {
    id: 104,
    title: "Core Python Concepts",
    topics: ["Python", "Data Structures", "OOP", "Functions"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "python_q_1", "python_q_2", "python_q_3", "python_q_4", "python_q_5",
      "python_q_6", "python_q_7", "python_q_8", "python_q_9", "python_q_10"
    ],
  },
  {
    id: 105,
    title: "AWS Cloud Practitioner",
    topics: ["AWS", "EC2", "S3", "IAM", "Lambda"],
    numberOfQuestions: 10,
    duration: 20,
    questionIds: [
      "aws_q_1", "aws_q_2", "aws_q_3", "aws_q_4", "aws_q_5",
      "aws_q_6", "aws_q_7", "aws_q_8", "aws_q_9", "aws_q_10"
    ],
  },
  {
    id: 106,
    title: "Introduction to Docker",
    topics: ["Docker", "Containers", "Images", "Dockerfile"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "docker_q_1", "docker_q_2", "docker_q_3", "docker_q_4", "docker_q_5",
      "docker_q_6", "docker_q_7", "docker_q_8", "docker_q_9", "docker_q_10"
    ],
  },
  {
    id: 107,
    title: "PostgreSQL Database Quiz",
    topics: ["PostgreSQL", "SQL", "Joins", "Queries"],
    numberOfQuestions: 10,
    duration: 20,
    questionIds: [
      "postgres_q_1", "postgres_q_2", "postgres_q_3", "postgres_q_4", "postgres_q_5",
      "postgres_q_6", "postgres_q_7", "postgres_q_8", "postgres_q_9", "postgres_q_10"
    ],
  },
  {
    id: 108,
    title: "Object-Oriented Programming",
    topics: ["OOP", "Encapsulation", "Inheritance", "Polymorphism"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "oops_q_1", "oops_q_2", "oops_q_3", "oops_q_4", "oops_q_5",
      "oops_q_6", "oops_q_7", "oops_q_8", "oops_q_9", "oops_q_10"
    ],
  },
  {
    id: 109,
    title: "Figma for UI/UX Design",
    topics: ["Figma", "UI Design", "Prototyping", "Components"],
    numberOfQuestions: 10,
    duration: 10,
    questionIds: [
      "figma_q_1", "figma_q_2", "figma_q_3", "figma_q_4", "figma_q_5",
      "figma_q_6", "figma_q_7", "figma_q_8", "figma_q_9", "figma_q_10"
    ],
  },
  {
    id: 110,
    title: "Tailwind CSS Styling",
    topics: ["Tailwind", "Utility-First", "CSS", "Responsive Design"],
    numberOfQuestions: 10,
    duration: 10,
    questionIds: [
      "tailwind_q_1", "tailwind_q_2", "tailwind_q_3", "tailwind_q_4", "tailwind_q_5",
      "tailwind_q_6", "tailwind_q_7", "tailwind_q_8", "tailwind_q_9", "tailwind_q_10"
    ],
  },
  {
    id: 111,
    title: "Java Core Concepts",
    topics: ["Java", "JVM", "OOP", "Data Types"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "java_q_1", "java_q_2", "java_q_3", "java_q_4", "java_q_5",
      "java_q_6", "java_q_7", "java_q_8", "java_q_9", "java_q_10"
    ],
  },
  {
    id: 112,
    title: "C++ Programming Challenge",
    topics: ["C++", "Pointers", "OOP", "Memory Management"],
    numberOfQuestions: 10,
    duration: 20,
    questionIds: [
      "cpp_q_1", "cpp_q_2", "cpp_q_3", "cpp_q_4", "cpp_q_5",
      "cpp_q_6", "cpp_q_7", "cpp_q_8", "cpp_q_9", "cpp_q_10"
    ],
  },
  {
    id: 113,
    title: "Computer Networks",
    topics: ["OSI Model", "TCP/IP", "Protocols", "Networking"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "cn_q_1", "cn_q_2", "cn_q_3", "cn_q_4", "cn_q_5",
      "cn_q_6", "cn_q_7", "cn_q_8", "cn_q_9", "cn_q_10"
    ],
  },
  {
    id: 114,
    title: "Django Web Framework",
    topics: ["Django", "Python", "MVT", "ORM"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "django_q_1", "django_q_2", "django_q_3", "django_q_4", "django_q_5",
      "django_q_6", "django_q_7", "django_q_8", "django_q_9", "django_q_10"
    ],
  },
  {
    id: 115,
    title: "GraphQL API Basics",
    topics: ["GraphQL", "API", "Schema", "Queries", "Mutations"],
    numberOfQuestions: 10,
    duration: 15,
    questionIds: [
      "graphql_q_1", "graphql_q_2", "graphql_q_3", "graphql_q_4", "graphql_q_5",
      "graphql_q_6", "graphql_q_7", "graphql_q_8", "graphql_q_9", "graphql_q_10"
    ],
  },
];