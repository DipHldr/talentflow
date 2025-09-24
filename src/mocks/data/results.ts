import type { AssessmentResult } from "../types/assesment";

export const moreMockAssessmentResults:AssessmentResult[] = [
    {
    assessmentId: 101, // React
    candidateId: 1,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-24T10:30:00Z'),
    answers: [
      { questionId: 'react_q_1', selectedAnswer: 'A syntax extension for JavaScript' }, // Correct
      { questionId: 'react_q_2', selectedAnswer: 'To manage state in functional components' }, // Correct
      { questionId: 'react_q_3', selectedAnswer: 'Using props' }, // Correct
      { questionId: 'react_q_4', selectedAnswer: 'useCallback' }, // Incorrect
      { questionId: 'react_q_5', selectedAnswer: 'A lightweight in-memory copy of the actual DOM' }, // Correct
    ],
  },
  // --- Candidate 2 ---
  {
    assessmentId: 102, // Node.js
    candidateId: 2,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-23T14:00:00Z'),
    answers: [
      { questionId: 'node_q_1', selectedAnswer: 'A JavaScript runtime built on Chrome\'s V8 engine' }, // Correct
      { questionId: 'node_q_2', selectedAnswer: 'A way to handle UI events' }, // Incorrect
      { questionId: 'node_q_3', selectedAnswer: 'Node Package Manager' }, // Correct
      { questionId: 'node_q_4', selectedAnswer: 'To define a new variable' }, // Incorrect
      { questionId: 'node_q_5', selectedAnswer: 'A web application framework for Node.js' }, // Correct
    ],
  },
  // --- Candidate 3 ---
  {
    assessmentId: 103, // TypeScript
    candidateId: 3,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-22T09:15:00Z'),
    answers: [
      { questionId: 'ts_q_1', selectedAnswer: 'A statically typed superset of JavaScript' }, // Correct
      { questionId: 'ts_q_2', selectedAnswer: 'tsc' }, // Correct
      { questionId: 'ts_q_3', selectedAnswer: '`unknown` is safer as it requires type checking before use' }, // Correct
      { questionId: 'ts_q_4', selectedAnswer: 'An array with a fixed number of elements of specific types' }, // Correct
      { questionId: 'ts_q_5', selectedAnswer: 'To define the shape or contract of an object' }, // Correct
    ],
  },
  // --- Candidate 4 ---
  {

    assessmentId: 102, // Node.js
    candidateId: 4,
    score: 2,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-25T11:00:00Z'),
    answers: [
      { questionId: 'node_q_6', selectedAnswer: 'A way to connect to a database' }, // Incorrect
      { questionId: 'node_q_7', selectedAnswer: 'A way to handle and manipulate streaming data' }, // Correct
      { questionId: 'node_q_8', selectedAnswer: ['`const` variables cannot be reassigned'] }, // Incorrect
      { questionId: 'node_q_9', selectedAnswer: 'To define project metadata and manage dependencies' }, // Correct
      { questionId: 'node_q_10', selectedAnswer: 'To manage caching' }, // Incorrect
    ],
  },
  // --- Candidate 5 ---
  {

    assessmentId: 104, // Python
    candidateId: 5,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-25T12:30:00Z'),
    answers: [
        { questionId: 'python_q_1', selectedAnswer: 'A high-level, interpreted programming language' }, // Correct
        { questionId: 'python_q_2', selectedAnswer: ['Dynamically typed', 'Object-oriented', 'Statically typed'] }, // Incorrect
        { questionId: 'python_q_3', selectedAnswer: 'Lists are mutable, tuples are immutable' }, // Correct
        { questionId: 'python_q_4', selectedAnswer: 'An unordered collection of key-value pairs' }, // Correct
        { questionId: 'python_q_5', selectedAnswer: 'Anonymous functions defined with the `lambda` keyword' }, // Correct
    ],
  },
  // --- Candidate 6 ---
  {

    assessmentId: 105, // AWS
    candidateId: 6,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-24T15:00:00Z'),
    answers: [
        { questionId: 'aws_q_1', selectedAnswer: 'A cloud computing platform by Amazon' }, // Correct
        { questionId: 'aws_q_2', selectedAnswer: 'A service that provides scalable virtual servers in the cloud' }, // Correct
        { questionId: 'aws_q_3', selectedAnswer: 'An object storage service' }, // Correct
        { questionId: 'aws_q_4', selectedAnswer: 'A serverless compute service that runs your code in response to events' }, // Correct
        { questionId: 'aws_q_5', selectedAnswer: 'A service that helps you securely control access to AWS resources' }, // Correct
    ],
  },
  // --- Candidate 7 ---
  {
    assessmentId: 106, // Docker
    candidateId: 7,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-23T18:45:00Z'),
    answers: [
      { questionId: 'docker_q_1', selectedAnswer: 'A platform for developing, shipping, and running applications in containers' }, // Correct
      { questionId: 'docker_q_2', selectedAnswer: 'A full operating system' }, // Incorrect
      { questionId: 'docker_q_3', selectedAnswer: 'A read-only template with instructions for creating a Docker container' }, // Correct
      { questionId: 'docker_q_4', selectedAnswer: 'A running container' }, // Incorrect
      { questionId: 'docker_q_5', selectedAnswer: 'A container is a running instance of an image' }, // Correct
    ],
  },
  // --- Candidate 8 ---
  {
    assessmentId: 101, // React
    candidateId: 8,
    score: 2,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-22T20:00:00Z'),
    answers: [
      { questionId: 'react_q_11', selectedAnswer: ['useState', 'useEffect'] }, // Incorrect
      { questionId: 'react_q_12', selectedAnswer: 'To style list items' }, // Incorrect
      { questionId: 'react_q_13', selectedAnswer: 'A component that renders another component' }, // Incorrect
      { questionId: 'react_q_14', selectedAnswer: 'Complex state logic with a reducer function' }, // Correct
      { questionId: 'react_q_15', selectedAnswer: 'To memoize a function, preventing unnecessary re-creations' }, // Correct
    ],
  },
  // --- Candidate 9 ---
  {

    assessmentId: 107, // Postgres
    candidateId: 9,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-21T08:00:00Z'),
    answers: [
      { questionId: 'postgres_q_1', selectedAnswer: 'An object-relational database management system (ORDBMS)' }, // Correct
      { questionId: 'postgres_q_2', selectedAnswer: '`SELECT * FROM users;`' }, // Correct
      { questionId: 'postgres_q_3', selectedAnswer: 'A constraint that uniquely identifies each record in a table' }, // Correct
      { questionId: 'postgres_q_4', selectedAnswer: 'A key used to link two tables together' }, // Correct
      { questionId: 'postgres_q_5', selectedAnswer: 'Combines rows from two or more tables based on a related column' }, // Correct
    ],
  },
  // --- Candidate 10 ---
  {
    assessmentId: 108, // OOPS
    candidateId: 10,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-20T13:20:00Z'),
    answers: [
      { questionId: 'oops_q_1', selectedAnswer: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'] }, // Correct
      { questionId: 'oops_q_2', selectedAnswer: 'The bundling of data and the methods that operate on that data into a single unit (a class)' }, // Correct
      { questionId: 'oops_q_3', selectedAnswer: 'Wrapping data and code together' }, // Incorrect
      { questionId: 'oops_q_4', selectedAnswer: 'A mechanism where a new class derives properties and behavior from an existing class' }, // Correct
      { questionId: 'oops_q_5', selectedAnswer: 'The ability of a variable, function, or object to take on multiple forms' }, // Correct
    ],
  },
  {

    assessmentId: 108, // OOPS
    candidateId: 10,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-04T10:00:00Z'),
    answers: [
      { questionId: 'oops_q_6', selectedAnswer: 'A class is a blueprint, and an object is an instance of that blueprint' }, // Correct
      { questionId: 'oops_q_7', selectedAnswer: 'Encapsulation' }, // Incorrect
      { questionId: 'oops_q_8', selectedAnswer: 'Compile-time Polymorphism' }, // Correct
      { questionId: 'oops_q_9', selectedAnswer: 'Encapsulation' }, // Correct
      { questionId: 'oops_q_10', selectedAnswer: 'A method to destroy an object' }, // Incorrect
    ],
  },
  {

    assessmentId: 104, // Python
    candidateId: 10,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-04T11:30:00Z'),
    answers: [
      { questionId: 'python_q_6', selectedAnswer: 'It is a null operation; nothing happens when it executes' }, // Correct
      { questionId: 'python_q_7', selectedAnswer: 'A Python interpreter' }, // Incorrect
      { questionId: 'python_q_8', selectedAnswer: 'A concise way to create lists' }, // Correct
      { questionId: 'python_q_9', selectedAnswer: 'It is the constructor for a class' }, // Correct
      { questionId: 'python_q_10', selectedAnswer: 'The ability of a class to derive properties from another class' }, // Correct
    ],
  },
  
  // --- Candidates 11-20 take one test each ---
  {

    assessmentId: 107, // Postgres
    candidateId: 11,
    score: 2,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-03T14:00:00Z'),
    answers: [
      { questionId: 'postgres_q_6', selectedAnswer: 'A special lookup table that the database search engine can use to speed up data retrieval' }, // Correct
      { questionId: 'postgres_q_7', selectedAnswer: 'Association, Connection, Integrity, Durability' }, // Incorrect
      { questionId: 'postgres_q_8', selectedAnswer: '`FULL OUTER JOIN`' }, // Correct
      { questionId: 'postgres_q_9', selectedAnswer: 'To sort the result set' }, // Incorrect
      { questionId: 'postgres_q_10', selectedAnswer: 'A graphical user interface for PostgreSQL' }, // Incorrect
    ],
  },
  {

    assessmentId: 101, // React
    candidateId: 12,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-02T16:00:00Z'),
    answers: [
      { questionId: 'react_q_1', selectedAnswer: 'A syntax extension for JavaScript' }, // Correct
      { questionId: 'react_q_2', selectedAnswer: 'To manage state in functional components' }, // Correct
      { questionId: 'react_q_3', selectedAnswer: 'Using props' }, // Correct
      { questionId: 'react_q_4', selectedAnswer: 'useEffect' }, // Correct
      { questionId: 'react_q_5', selectedAnswer: 'A lightweight in-memory copy of the actual DOM' }, // Correct
    ],
  },
  {

    assessmentId: 103, // TypeScript
    candidateId: 13,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-01T09:00:00Z'),
    answers: [
      { questionId: 'ts_q_11', selectedAnswer: 'Creates a union type of the keys of an object type' }, // Correct
      { questionId: 'ts_q_12', selectedAnswer: ['typeof', 'instanceof', 'in'] }, // Correct
      { questionId: 'ts_q_13', selectedAnswer: 'To create an alias' }, // Incorrect
      { questionId: 'ts_q_14', selectedAnswer: 'A type for values that never occur' }, // Correct
      { questionId: 'ts_q_15', selectedAnswer: 'It contains type declaration for existing JavaScript code' }, // Correct
    ],
  },
  {

    assessmentId: 105, // AWS
    candidateId: 14,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-08-31T11:00:00Z'),
    answers: [
      { questionId: 'aws_q_11', selectedAnswer: 'To automatically adjust the number of EC2 instances in response to traffic' }, // Correct
      { questionId: 'aws_q_12', selectedAnswer: 'A relational database' }, // Incorrect
      { questionId: 'aws_q_13', selectedAnswer: ['EC2', 'S3', 'RDS', 'Lambda'] }, // Correct
      { questionId: 'aws_q_14', selectedAnswer: 'A running virtual server' }, // Incorrect
      { questionId: 'aws_q_15', selectedAnswer: 'A model where AWS manages security *of* the cloud, and the customer manages security *in* the cloud' }, // Correct
    ],
  },
  {

    assessmentId: 106, // Docker
    candidateId: 15,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-08-30T13:30:00Z'),
    answers: [
      { questionId: 'docker_q_6', selectedAnswer: '`docker build`' }, // Correct
      { questionId: 'docker_q_7', selectedAnswer: '`docker start`' }, // Incorrect
      { questionId: 'docker_q_8', selectedAnswer: 'A cloud-based registry service for storing and sharing Docker images' }, // Correct
      { questionId: 'docker_q_9', selectedAnswer: 'To inform Docker that the container listens on the specified network ports at runtime' }, // Correct
      { questionId: 'docker_q_10', selectedAnswer: 'A tool for defining and running multi-container Docker applications' }, // Correct
    ],
  },
  {

    assessmentId: 102, // Node.js
    candidateId: 16,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-08-29T15:00:00Z'),
    answers: [
      { questionId: 'node_q_11', selectedAnswer: ['Callbacks', 'Promises', 'Async/Await'] }, // Correct
      { questionId: 'node_q_12', selectedAnswer: 'Provides file system-related functionality' }, // Correct
      { questionId: 'node_q_13', selectedAnswer: 'To define what a module makes available to other files' }, // Correct
      { questionId: 'node_q_14', selectedAnswer: 'An architectural style for designing networked applications' }, // Correct
      { questionId: 'node_q_15', selectedAnswer: 'A utility that automatically restarts the node application when file changes are detected' }, // Correct
    ],
  },
  {

    assessmentId: 109, // Figma (assuming ID 109)
    candidateId: 17,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-08-28T10:00:00Z'),
    answers: [
      { questionId: 'figma_q_1', selectedAnswer: 'A collaborative interface design tool' }, // Correct
      { questionId: 'figma_q_2', selectedAnswer: 'A container for your design elements, similar to an artboard' }, // Correct
      { questionId: 'figma_q_3', selectedAnswer: 'A text layer' }, // Incorrect
      { questionId: 'figma_q_4', selectedAnswer: 'A property that allows you to create designs that grow or shrink as their content changes' }, // Correct
      { questionId: 'figma_q_5', selectedAnswer: 'A way to combine and organize different states of a component, like hover or disabled' }, // Correct
    ],
  },
  {

    assessmentId: 110, // Tailwind (assuming ID 110)
    candidateId: 18,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-08-27T12:00:00Z'),
    answers: [
      { questionId: 'tailwind_q_1', selectedAnswer: 'A utility-first CSS framework' }, // Correct
      { questionId: 'tailwind_q_2', selectedAnswer: 'It has built-in utility components' }, // Incorrect
      { questionId: 'tailwind_q_3', selectedAnswer: '`class="font-bold text-red-500"`' }, // Correct
      { questionId: 'tailwind_q_4', selectedAnswer: 'To write custom CSS' }, // Incorrect
      { questionId: 'tailwind_q_5', selectedAnswer: 'It generates your CSS on-demand by scanning your template files for classes' }, // Correct
    ],
  },
  {

    assessmentId: 111, // Java (assuming ID 111)
    candidateId: 19,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-08-26T14:30:00Z'),
    answers: [
      { questionId: 'java_q_1', selectedAnswer: 'A high-level, class-based, object-oriented programming language' }, // Correct
      { questionId: 'java_q_2', selectedAnswer: 'An abstract machine that enables a computer to run a Java program' }, // Correct
      { questionId: 'java_q_3', selectedAnswer: 'JDK is for development, JRE is for running, and JVM is the virtual machine' }, // Correct
      { questionId: 'java_q_4', selectedAnswer: ['int', 'boolean', 'char'] }, // Correct
      { questionId: 'java_q_5', selectedAnswer: '`==` checks for reference equality, `.equals()` checks for value equality' }, // Correct
    ],
  },
  {

    assessmentId: 112, // C++ (assuming ID 112)
    candidateId: 20,
    score: 2,
    totalQuestions: 5,
    submittedAt: new Date('2025-08-25T16:00:00Z'),
    answers: [
      { questionId: 'cpp_q_1', selectedAnswer: 'A general-purpose programming language that is an extension of the C language' }, // Correct
      { questionId: 'cpp_q_2', selectedAnswer: 'There is no major difference' }, // Incorrect
      { questionId: 'cpp_q_3', selectedAnswer: 'A variable that stores the memory address of another variable' }, // Correct
      { questionId: 'cpp_q_4', selectedAnswer: 'They are identical' }, // Incorrect
      { questionId: 'cpp_q_5', selectedAnswer: 'A pointer' }, // Incorrect
    ],
  },
  
  // --- Candidates 21-25 take tests ---
  {

    assessmentId: 101, // React
    candidateId: 21,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-25T09:00:00Z'),
    answers: [
      { questionId: 'react_q_6', selectedAnswer: 'To group multiple elements without an extra DOM node' }, // Correct
      { questionId: 'react_q_7', selectedAnswer: 'To pass data through the component tree without prop-drilling' }, // Correct
      { questionId: 'react_q_8', selectedAnswer: 'Passing props down multiple levels of nested components' }, // Correct
      { questionId: 'react_q_9', selectedAnswer: 'Using `useCallback`' }, // Incorrect
      { questionId: 'react_q_10', selectedAnswer: 'Components where form data is handled by React state' }, // Correct
    ],
  },
  {

    assessmentId: 102, // Node.js
    candidateId: 21,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-25T10:30:00Z'),
    answers: [
      { questionId: 'node_q_6', selectedAnswer: 'A function that has access to the request, response, and the next middleware function' }, // Correct
      { questionId: 'node_q_7', selectedAnswer: 'A way to handle and manipulate streaming data' }, // Correct
      { questionId: 'node_q_8', selectedAnswer: ['`var` is function-scoped, while `let` and `const` are block-scoped', '`const` variables cannot be reassigned'] }, // Incorrect
      { questionId: 'node_q_9', selectedAnswer: 'To configure the server' }, // Incorrect
      { questionId: 'node_q_10', selectedAnswer: 'To handle binary data' }, // Correct
    ],
  },
  {

    assessmentId: 104, // Python
    candidateId: 22,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-24T08:00:00Z'),
    answers: [
      { questionId: 'python_q_11', selectedAnswer: '`==` checks for value equality, `is` checks for object identity' }, // Correct
      { questionId: 'python_q_12', selectedAnswer: 'The instance of the class' }, // Correct
      { questionId: 'python_q_13', selectedAnswer: 'A function that takes another function and extends its behavior without explicitly modifying it' }, // Correct
      { questionId: 'python_q_14', selectedAnswer: 'A mutex that allows only one thread to execute Python bytecode at a time' }, // Correct
      { questionId: 'python_q_15', selectedAnswer: 'To create isolated Python environments' }, // Correct
    ],
  },
  {

    assessmentId: 113, // CN (assuming ID 113)
    candidateId: 23,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-23T07:00:00Z'),
    answers: [
      { questionId: 'cn_q_1', selectedAnswer: 'A conceptual framework that standardizes the functions of a telecommunication or computing system into seven abstraction layers' }, // Correct
      { questionId: 'cn_q_2', selectedAnswer: 'Data Link Layer' }, // Incorrect
      { questionId: 'cn_q_3', selectedAnswer: 'TCP is connection-oriented and reliable; UDP is connectionless and faster' }, // Correct
      { questionId: 'cn_q_4', selectedAnswer: 'A numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication' }, // Correct
      { questionId: 'cn_q_5', selectedAnswer: 'A type of network router' }, // Incorrect
    ],
  },
  {

    assessmentId: 108, // OOPS
    candidateId: 24,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-22T06:00:00Z'),
    answers: [
      { questionId: 'oops_q_11', selectedAnswer: 'A class that cannot be instantiated and is meant to be subclassed' }, // Correct
      { questionId: 'oops_q_12', selectedAnswer: 'A contract that defines a set of methods a class must implement' }, // Correct
      { questionId: 'oops_q_13', selectedAnswer: 'The degree of dependency between software modules' }, // Correct
      { questionId: 'oops_q_14', selectedAnswer: 'A way to create objects' }, // Incorrect
      { questionId: 'oops_q_15', selectedAnswer: 'Low coupling, high cohesion' }, // Correct
    ],
  },
  {

    assessmentId: 114, // Django (assuming ID 114)
    candidateId: 25,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-21T05:00:00Z'),
    answers: [
      { questionId: 'django_q_1', selectedAnswer: 'A high-level Python web framework' }, // Correct
      { questionId: 'django_q_2', selectedAnswer: 'Model-View-Template' }, // Correct
      { questionId: 'django_q_3', selectedAnswer: 'The logical structure of a database table' }, // Correct
      { questionId: 'django_q_4', selectedAnswer: 'To handle the request and return a response' }, // Correct
      { questionId: 'django_q_5', selectedAnswer: 'A way to interact with the database using Python objects' }, // Correct
    ],
  },
  
  // --- More results for earlier candidates ---
  {

    assessmentId: 115, // GraphQL (assuming ID 115)
    candidateId: 1,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-25T14:00:00Z'),
    answers: [
      { questionId: 'graphql_q_1', selectedAnswer: 'A query language for APIs and a runtime for fulfilling those queries' }, // Correct
      { questionId: 'graphql_q_2', selectedAnswer: ['Query', 'Mutation', 'Subscription'] }, // Correct
      { questionId: 'graphql_q_3', selectedAnswer: 'It is easier to cache' }, // Incorrect
      { questionId: 'graphql_q_4', selectedAnswer: 'A description of the data and capabilities of the API' }, // Correct
      { questionId: 'graphql_q_5', selectedAnswer: 'A function responsible for fetching the data for a single field' }, // Correct
    ],
  },
  {

    assessmentId: 107, // Postgres
    candidateId: 2,
    score: 2,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-24T18:00:00Z'),
    answers: [
      { questionId: 'postgres_q_11', selectedAnswer: 'An auto-incrementing integer' }, // Correct
      { questionId: 'postgres_q_12', selectedAnswer: 'A single SQL query' }, // Incorrect
      { questionId: 'postgres_q_13', selectedAnswer: '`ALTER TABLE users ADD COLUMN email VARCHAR(255);`' }, // Correct
      { questionId: 'postgres_q_14', selectedAnswer: 'To sort the results' }, // Incorrect
      { questionId: 'postgres_q_15', selectedAnswer: '`TEXT`' }, // Incorrect
    ],
  },
  {

    assessmentId: 104, // Python
    candidateId: 6,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-23T19:00:00Z'),
    answers: [
      { questionId: 'python_q_1', selectedAnswer: 'A compiled language' }, // Incorrect
      { questionId: 'python_q_2', selectedAnswer: ['Dynamically typed', 'Object-oriented', 'Interpreted'] }, // Correct
      { questionId: 'python_q_3', selectedAnswer: 'They are the same' }, // Incorrect
      { questionId: 'python_q_4', selectedAnswer: 'An unordered collection of key-value pairs' }, // Correct
      { questionId: 'python_q_5', selectedAnswer: 'Anonymous functions defined with the `lambda` keyword' }, // Correct
    ],
  },
  {

    assessmentId: 101, // React
    candidateId: 15,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-22T21:00:00Z'),
    answers: [
      { questionId: 'react_q_1', selectedAnswer: 'A syntax extension for JavaScript' }, // Correct
      { questionId: 'react_q_2', selectedAnswer: 'To manage state in functional components' }, // Correct
      { questionId: 'react_q_3', selectedAnswer: 'Using context' }, // Incorrect
      { questionId: 'react_q_4', selectedAnswer: 'useEffect' }, // Correct
      { questionId: 'react_q_5', selectedAnswer: 'A lightweight in-memory copy of the actual DOM' }, // Correct
    ],
  },
  {

    assessmentId: 102, // Node.js
    candidateId: 15,
    score: 3,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-22T22:30:00Z'),
    answers: [
      { questionId: 'node_q_1', selectedAnswer: 'A JavaScript runtime built on Chrome\'s V8 engine' }, // Correct
      { questionId: 'node_q_2', selectedAnswer: 'A security feature' }, // Incorrect
      { questionId: 'node_q_3', selectedAnswer: 'Node Package Manager' }, // Correct
      { questionId: 'node_q_4', selectedAnswer: 'To include external modules in a file' }, // Correct
      { questionId: 'node_q_5', selectedAnswer: 'A database ORM' }, // Incorrect
    ],
  },
  {

    assessmentId: 111, // Java
    candidateId: 4,
    score: 4,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-20T23:00:00Z'),
    answers: [
      { questionId: 'java_q_6', selectedAnswer: 'A class having two or more methods with the same name but different parameters' }, // Correct
      { questionId: 'java_q_7', selectedAnswer: 'A class having multiple methods with the same name' }, // Incorrect
      { questionId: 'java_q_8', selectedAnswer: 'A class that cannot be instantiated and may contain abstract methods' }, // Correct
      { questionId: 'java_q_9', selectedAnswer: 'A blueprint of a class that has static constants and abstract methods' }, // Correct
      { questionId: 'java_q_10', selectedAnswer: 'To create a member that belongs to the class itself, rather than to an instance' }, // Correct
    ],
  },
  {

    assessmentId: 110, // Tailwind
    candidateId: 1,
    score: 5,
    totalQuestions: 5,
    submittedAt: new Date('2025-09-25T15:00:00Z'),
    answers: [
      { questionId: 'tailwind_q_6', selectedAnswer: 'Using the `hover:` prefix, like `hover:bg-blue-700`' }, // Correct
      { questionId: 'tailwind_q_7', selectedAnswer: 'To inline existing utility classes into your own custom CSS' }, // Correct
      { questionId: 'tailwind_q_8', selectedAnswer: 'Using responsive prefixes like `md:`, `lg:`, etc.' }, // Correct
      { questionId: 'tailwind_q_9', selectedAnswer: ['You aren\'t forced to invent class names', 'Your CSS stops growing', 'Making changes feels safer'] }, // Correct
      { questionId: 'tailwind_q_10', selectedAnswer: 'To style child elements based on the state of a parent element' }, // Correct
    ],
  },
];