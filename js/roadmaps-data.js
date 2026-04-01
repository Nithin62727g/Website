// Pre-built static roadmap data (mirrors Android app content)
// Format: title -> { diff, desc, hrs, mods:[{t, tps:[]}] }
const ROADMAPS_DATA = {
"Frontend":{ diff:"Beginner", hrs:10, desc:"Master modern frontend development from HTML to advanced JavaScript frameworks.", mods:[
{t:"Internet Basics", tps:["How the Internet Works","HTTP & HTTPS","DNS & Domain Names","Browsers & How They Work","Hosting & CDNs","Web Performance Basics"]},
{t:"HTML Fundamentals", tps:["HTML Document Structure","Semantic HTML Tags","Forms & Validations","Accessibility (a11y)","SEO Best Practices","Audio & Video APIs","HTML5 Canvas","Web Storage APIs"]},
{t:"CSS Styling", tps:["CSS Box Model","Selectors & Specificity","Flexbox Layouts","CSS Grid","Media Queries & Responsive Design","CSS Variables","CSS Animations & Keyframes","CSS Custom Properties"]},
{t:"JavaScript Basics", tps:["Variables & Data Types","Functions & Scope","DOM Manipulation","Events & Event Listeners","Fetch API & Promises","ES6+ Features","Error Handling","Modules & Imports"]},
{t:"Version Control", tps:["Git Basics","Branching & Merging","GitHub Workflow","Pull Requests","Rebasing","Git Hooks"]},
{t:"Package Managers", tps:["npm Basics","yarn","Package.json","Dependency Management","npx"]},
{t:"CSS Frameworks", tps:["Tailwind CSS","Bootstrap","CSS-in-JS","Styled Components"]},
{t:"JavaScript Framework", tps:["React Basics","Component Lifecycle","State & Props","Hooks","Context API","React Router"]},
{t:"Build Tools", tps:["Vite","Webpack","Babel","ESLint & Prettier","Module Bundlers"]},
{t:"Testing", tps:["Unit Testing with Jest","React Testing Library","E2E with Playwright","Test-Driven Development"]}
]},
"Backend":{ diff:"Intermediate", hrs:12, desc:"Build scalable server-side applications, APIs, and databases.", mods:[
{t:"Internet & OS Basics", tps:["How the Internet Works","HTTP Methods","Linux Basics","Terminal Commands","SSH"]},
{t:"Programming Language", tps:["Python or Node.js Basics","Object-Oriented Programming","Functional Programming","Error Handling","Async Programming"]},
{t:"Databases", tps:["Relational Databases (SQL)","PostgreSQL / MySQL","NoSQL (MongoDB)","Database Design","Indexing & Performance","Transactions & ACID"]},
{t:"APIs", tps:["REST API Design","HTTP Status Codes","Authentication & Authorization","JWT & OAuth","GraphQL Basics","API Documentation (Swagger)"]},
{t:"Security", tps:["HTTPS & SSL","OWASP Top 10","Input Validation","Password Hashing","CORS & CSP","Rate Limiting"]},
{t:"Caching", tps:["Redis Basics","Cache Strategies","CDN Caching","In-memory Caching"]},
{t:"Testing & CI/CD", tps:["Unit & Integration Tests","Mocking & Fixtures","GitHub Actions","Docker Basics","Deployment Pipelines"]}
]},
"DevOps":{ diff:"Intermediate", hrs:15, desc:"Learn to automate, deploy and manage infrastructure at scale.", mods:[
{t:"Linux & Scripting", tps:["Linux Fundamentals","Bash Scripting","File System","Process Management","Networking Basics","Cron Jobs"]},
{t:"Version Control", tps:["Git Advanced","Branching Strategies","GitFlow","Monorepos"]},
{t:"Containers", tps:["Docker Fundamentals","Dockerfile","Docker Compose","Container Networking","Image Optimization"]},
{t:"CI/CD", tps:["GitHub Actions","Jenkins","GitLab CI","Pipeline Design","Automated Testing","Artifact Management"]},
{t:"Kubernetes", tps:["K8s Architecture","Pods & Deployments","Services & Ingress","ConfigMaps & Secrets","Helm Charts","Monitoring with Prometheus"]},
{t:"Cloud Platforms", tps:["AWS Core Services","EC2 & S3","VPC & Networking","IAM & Security","Load Balancers","Auto Scaling"]},
{t:"Infrastructure as Code", tps:["Terraform Basics","Ansible","CloudFormation","State Management","Modules & Reuse"]},
{t:"Monitoring", tps:["Prometheus & Grafana","Log Management (ELK)","Alerting","SLOs & SLAs","Incident Response"]}
]},
"Python":{ diff:"Beginner", hrs:8, desc:"The complete Python mastery path from beginner to advanced.", mods:[
{t:"Python Basics", tps:[
  {t:"Installing Python & pip", dur:"15m", d:"Getting Python set up correctly with pip is the first step to becoming a developer.", k:"Environment Setup, pip, Path"},
  {t:"Variables & Data Types", dur:"20m", d:"Variables are the building blocks of any program. Learn about integers, floats, and strings.", k:"Naming, Types, Memory"},
  {t:"Strings & String Methods", dur:"25m", d:"Mastering text manipulation is essential for data processing and web development.", k:"Slicing, Methods, Formatting"},
  {t:"Numbers & Math Operations", dur:"15m", d:"Python's power in math makes it a top choice for scientific computing.", k:"Operators, Math module, Floats"},
  {t:"Booleans & Comparisons", dur:"15m", d:"Logic is the heart of control flow. Learn how Python handles truth and falsity.", k:"Logic, Comparisons, Truthiness"},
  {t:"Input & Output", dur:"15m", d:"Learn how to interact with the user via terminal input and print statements.", k:"print(), input(), Formatting"},
  {t:"Comments & Documentation", dur:"10m", d:"Writing clean, documented code is a professional requirement.", k:"Docstrings, PEP8, Readability"}
]},
{t:"Control Flow", tps:[
  {t:"if / elif / else Statements", dur:"20m", d:"Direct your program's execution based on conditions.", k:"Branching, Logic, Indentation"},
  {t:"for Loops", dur:"25m", d:"Iterate over collections and sequences with ease.", k:"Iterables, range(), for-in"},
  {t:"while Loops", dur:"20m", d:"Repeat actions as long as a condition remains true.", k:"Conditions, Infinite Loops, logic"},
  {t:"break, continue, pass", dur:"15m", d:"Fine-tune your loop control with these keywords.", k:"Loop control, Logic, syntax"},
  {t:"List Comprehensions", dur:"25m", d:"Write elegant, one-line list transformations.", k:"Expressivity, Efficiency, Syntax"},
  {t:"Dict & Set Comprehensions", dur:"20m", d:"Apply the power of comprehensions to dictionaries and sets.", k:"Map/Reduce patterns, syntax"},
  {t:"Generator Expressions", dur:"25m", d:"Learn to handle large data efficiently with lazy evaluation.", k:"Lazy evaluation, Memory, Iterators"}
]},
{t:"Data Structures", tps:[
  {t:"Lists & Tuples", dur:"30m", d:"The most common ways to store sequences of data.", k:"Mutability, Methods, Slicing"},
  {t:"Dictionaries", dur:"25m", d:"Store data in key-value pairs for fast lookups.", k:"Hash maps, keys, values"},
  {t:"Sets", dur:"20m", d:"Handle unique elements and perform mathematical set operations.", k:"Uniqueness, Intersections, Unions"},
  {t:"Stacks & Queues", dur:"25m", d:"Understand fundamental computer science data structures.", k:"LIFO, FIFO, collections.deque"},
  {t:"Linked Lists", dur:"30m", d:"Dive deeper into memory management and node-based structures.", k:"Nodes, Pointers, Traversal"},
  {t:"Heaps & Priority Queues", dur:"30m", d:"Efficiently find the smallest or largest elements.", k:"Min-heap, Max-heap, heapq"},
  {t:"Deque (collections module)", dur:"20m", d:"Optimized double-ended queues for fast appends and pops.", k:"Performance, Queues, thread-safety"}
]},
{t:"Functions & Scope", tps:[
  {t:"Defining Functions", dur:"20m", d:"Extract logic into reusable blocks.", k:"def, parameters, return"},
  {t:"Arguments & Defaults", dur:"20m", d:"Learn the flexibility of Python's function arguments.", k:"Positional, Keyword, Defaults"},
  {t:"*args and **kwargs", dur:"25m", d:"Handle arbitrary numbers of arguments like a pro.", k:"Unpacking, flexibility, dynamic calls"},
  {t:"Lambda Functions", dur:"15m", d:"Anonymous, small functions for simple operations.", k:"One-liners, Functional style"},
  {t:"Closures", dur:"25m", d:"Capture state in your functions with lexical scoping.", k:"Scope, state, higher-order functions"},
  {t:"Decorators", dur:"30m", d:"The ultimate tool for modifying function behavior without changing code.", k:"Wrappers, syntax sugar, @"},
  {t:"Recursion Patterns", dur:"30m", d:"Solve complex nested problems by calling functions within themselves.", k:"Base case, stack, patterns"}
]},
{t:"Object-Oriented Python", tps:[
  {t:"Classes & Objects", dur:"25m", d:"Group data and behavior together into logical entities.", k:"Blueprints, instances, state"},
  {t:"__init__ & self", dur:"20m", d:"The core concepts of object initialization in Python.", k:"Constructor, instance reference"},
  {t:"Inheritance", dur:"25m", d:"Build specialized classes on top of general ones.", k:"subclasses, super(), code reuse"},
  {t:"Polymorphism", dur:"20m", d:"Treat different objects the same way through a common interface.", k:"Duck typing, method overriding"},
  {t:"Magic/Dunder Methods", dur:"30m", d:"Unlock Python's internal protocols for your classes.", k:"__str__, __repr__, __len__"},
  {t:"Abstract Classes", dur:"25m", d:"Define strict interfaces that subclasses must follow.", k:"abc module, enforcement"},
  {t:"Dataclasses", dur:"20m", d:"Modern, boilerplate-free way to define classes that primarily hold data.", k:"@dataclass, auto-generation"},
  {t:"Property Decorators", dur:"25m", d:"Manage attribute access with getter and setter logic.", k:"Encapsulation, @property"}
]},
{t:"File I/O & Exceptions", tps:[
  {t:"Reading & Writing Files", dur:"20m", d:"Persist data to the filesystem.", k:"open(), modes, buffers"},
  {t:"Context Managers (with)", dur:"15m", d:"The safe way to handle resources like files and sockets.", k:"Resource management, safety"},
  {t:"try / except / finally", dur:"20m", d:"Gracefully handle errors and unexpected states.", k:"Error handling, robustness"},
  {t:"Custom Exceptions", dur:"20m", d:"Define your own error types for better API design.", k:"Hierarchy, clarity, specialized errors"},
  {t:"JSON & CSV Handling", dur:"25m", d:"Work with common data exchange formats.", k:"Serialization, parsing, modules"},
  {t:"Path Management (pathlib)", dur:"20m", d:"Modern, object-oriented way to handle file paths.", k:"Platform independence, Path objects"}
]},
{t:"Standard Library", tps:[
  {t:"os & sys Modules", dur:"25m", d:"Interact with the operating system and interpreter.", k:"Environment, paths, arguments"},
  {t:"datetime Module", dur:"20m", d:"Handle time, dates, and timezones correctly.", k:"Objects, formatting, deltas"},
  {t:"re (Regular Expressions)", dur:"30m", d:"Master the hammer of text searching and manipulation.", k:"Patterns, matching, extraction"},
  {t:"itertools & functools", dur:"30m", d:"Advanced functional tools for high-performance iteration.", k:"Map/Reduce, efficient combinations"},
  {t:"threading & multiprocessing", dur:"35m", d:"Speed up your tasks with parallel and concurrent execution.", k:"Locks, queues, parallelism"},
  {t:"subprocess Module", dur:"25m", d:"Launch and interact with external system commands.", k:"Shell, pipes, wait()"},
  {t:"logging Module", dur:"20m", d:"Ditch print() for a professional industry-standard logging system.", k:"Levels, handlers, persistence"}
]},
{t:"Python Ecosystem", tps:[
  {t:"Virtual Environments (venv)", dur:"15m", d:"Keep your project dependencies isolated.", k:"Isolation, activation, pip"},
  {t:"pip & pyproject.toml", dur:"15m", d:"Modern dependency management in Python.", k:"Packages, configuration, standards"},
  {t:"Type Hints & mypy", dur:"25m", d:"Catch bugs before they happen with static typing.", k:"Annotations, verification, quality"},
  {t:"Unit Testing (pytest)", dur:"30m", d:"Ensure your code works as expected with automated tests.", k:"Assertions, fixtures, coverage"},
  {t:"Linting with flake8/ruff", dur:"15m", d:"Keep your codebase clean and consistent.", k:"Standards, automation, PEP8"},
  {t:"Packaging & Publishing", dur:"30m", d:"Share your code with the world on PyPI.", k:"Build, upload, distribution"}
]},
{t:"Web & APIs", tps:[
  {t:"FastAPI Basics", dur:"30m", d:"Build high-performance APIs with modern Python.", k:"Pydantic, async, type-safety"},
  {t:"Flask Fundamentals", dur:"25m", d:"The micro-framework that's perfect for simple web apps.", k:"Routing, templates, simplicity"},
  {t:"SQLAlchemy ORM", dur:"35m", d:"Modern object-relational mapping for databases.", k:"Models, queries, engines"},
  {t:"Pydantic Models", dur:"25m", d:"Data validation and settings management using Python types.", k:"Validation, schemas, efficiency"},
  {t:"HTTP Requests (httpx)", dur:"20m", d:"Modern, async-ready HTTP client for Python.", k:"Requests, async, timeouts"},
  {t:"Authentication & JWT", dur:"35m", d:"Secure your apps with modern web tokens.", k:"Security, tokens, verification"},
  {t:"Async Python (asyncio)", dur:"40m", d:"Master concurrency for high-scale IO-bound apps.", k:"Event loop, await, non-blocking"}
]},
{t:"Data Science Tools", tps:[
  {t:"NumPy Arrays", dur:"30m", d:"The bedrock of scientific computing in Python.", k:"Arrays, broadcasting, performance"},
  {t:"Pandas DataFrames", dur:"40m", d:"Flexible and powerful data analysis and manipulation.", k:"Series, cleaning, aggregation"},
  {t:"Matplotlib Charts", dur:"30m", d:"Create professional-grade static visualizations.", k:"Plots, figures, styling"},
  {t:"Seaborn Visualization", dur:"25m", d:"High-level statistical data visualization.", k:"Themes, statistical plots"},
  {t:"Scikit-learn ML Basics", dur:"40m", d:"Machine learning in Python made easy.", k:"Models, fit/predict, evaluation"},
  {t:"Jupyter Notebooks", dur:"15m", d:"Interactive environment for code and documentation.", k:"IPython, kernels, sharing"}
]}
]},
"JavaScript":{ diff:"Beginner", hrs:8, desc:"Complete JavaScript from foundations to modern ES2024.", mods:[
{t:"JS Fundamentals", tps:["Variables (let/const/var)","Data Types","Operators","Control Flow","Loops","Functions"]},
{t:"DOM & Browser", tps:["DOM Selection","DOM Manipulation","Events","Forms & Validation","localStorage","Fetch API"]},
{t:"ES6+ Features", tps:["Arrow Functions","Destructuring","Spread & Rest","Template Literals","Modules","Optional Chaining"]},
{t:"Async JavaScript", tps:["Callbacks","Promises","async/await","Error Handling","Promise.all","Event Loop"]},
{t:"OOP in JS", tps:["Prototypes","Classes","Inheritance","Private Fields","Mixins","Design Patterns"]},
{t:"Advanced Topics", tps:["Closures & Scope","The 'this' Keyword","WeakMap & WeakSet","Proxy & Reflect","Generators","Web Workers"]}
]},
"React":{ diff:"Intermediate", hrs:10, desc:"Build dynamic UIs with React, hooks, and the modern ecosystem.", mods:[
{t:"React Fundamentals", tps:["JSX Syntax","Components & Props","State with useState","Rendering Lists","Conditional Rendering","Event Handlers"]},
{t:"React Hooks", tps:["useEffect","useRef","useCallback","useMemo","Custom Hooks","useReducer"]},
{t:"Component Patterns", tps:["Composition","Higher-Order Components","Render Props","Compound Components","Controlled vs Uncontrolled"]},
{t:"State Management", tps:["Context API","Zustand","Redux Toolkit","React Query","Jotai"]},
{t:"Routing", tps:["React Router v6","Nested Routes","Protected Routes","Dynamic Routes","Lazy Loading"]},
{t:"Performance", tps:["React.memo","Code Splitting","Suspense","Profiling","Virtual DOM"]},
{t:"Testing", tps:["React Testing Library","Jest","Mocking API","Snapshot Testing","E2E with Playwright"]}
]},
"Node.js":{ diff:"Intermediate", hrs:10, desc:"Build scalable server-side JavaScript applications.", mods:[
{t:"Node.js Basics", tps:["Node Runtime","Event Loop","Modules (CommonJS & ESM)","npm Ecosystem","File System (fs)","Streams & Buffers"]},
{t:"HTTP & Express", tps:["HTTP Server","Express Setup","Routing","Middleware","Error Handling","Request & Response"]},
{t:"Databases", tps:["MongoDB with Mongoose","PostgreSQL with Knex","Sequelize ORM","Database Migrations","Connection Pooling"]},
{t:"Auth & Security", tps:["JWT Authentication","Passport.js","bcrypt Hashing","Session Management","CSRF Protection","Helmet.js"]},
{t:"APIs", tps:["RESTful API Design","GraphQL with Apollo","WebSockets","Server-Sent Events","API Rate Limiting"]},
{t:"Testing & Deploy", tps:["Jest for Node","Supertest","Docker Containerization","PM2","Nginx Reverse Proxy"]}
]},
"TypeScript":{ diff:"Intermediate", hrs:8, desc:"Add static typing to JavaScript for safer, scalable codebases.", mods:[
{t:"TS Fundamentals", tps:["Type Annotations","Primitive Types","Arrays & Tuples","Enums","Functions","Type Inference"]},
{t:"Interfaces & Types", tps:["Interfaces","Type Aliases","Union & Intersection Types","Literal Types","Optional Properties","Readonly"]},
{t:"Advanced Types", tps:["Generics","Utility Types (Partial, Required)","Mapped Types","Conditional Types","Template Literal Types","Infer"]},
{t:"OOP in TS", tps:["Classes","Access Modifiers","Abstract Classes","Decorators","Mixins","Structural Typing"]},
{t:"TS with React", tps:["Component Props Typing","Event Types","useRef Typing","Custom Hooks","Generic Components"]},
{t:"Tooling", tps:["tsconfig.json","Strict Mode","ESLint with TypeScript","Declaration Files (.d.ts)","Module Resolution"]}
]},
"SQL":{ diff:"Beginner", hrs:6, desc:"Complete SQL and database mastery from fundamentals to optimization.", mods:[
{t:"SQL Fundamentals", tps:[
  {t:"What is a Database?", dur:"10m", d:"Understand the core concept of structured data storage and management.", k:"Databases, Storage, RDBMS"},
  {t:"Relational Model Concepts", dur:"15m", d:"Learn about tables, rows, columns, and how data relates across structures.", k:"Relations, Tuples, Attributes"},
  {t:"CREATE TABLE Statements", dur:"20m", d:"The first step in building a database: defining your schema.", k:"DDL, Schema, Syntax"},
  {t:"Data Types in SQL", dur:"15m", d:"Choosing the right data type is crucial for performance and integrity.", k:"VARCHAR, INT, DATE, BLOB"},
  {t:"INSERT INTO", dur:"15m", d:"Learn how to add new records to your database tables.", k:"DML, Values, syntax"},
  {t:"SELECT Queries", dur:"20m", d:"The most common SQL operation: retrieving data from one or more tables.", k:"Querying, Projection, Results"},
  {t:"WHERE Clause Filtering", dur:"20m", d:"Narrow down your results with precise conditional logic.", k:"Conditionals, logic, filtering"}
]},
{t:"Query Mastery", tps:[
  {t:"ORDER BY & LIMIT", dur:"10m", d:"Sort and paginate your results for better usability.", k:"Sorting, Pagination, UX"},
  {t:"GROUP BY & HAVING", dur:"25m", d:"The power of SQL: summarizing data into meaningful groups.", k:"Aggregation, conditions, reporting"},
  {t:"Aggregate Functions", dur:"15m", d:"Perform calculations across multiple rows (COUNT, SUM, AVG).", k:"Math, summaries, statistics"},
  {t:"DISTINCT & Aliases", dur:"10m", d:"Clean up your results and make column names more readable.", k:"Uniqueness, readability, AS"},
  {t:"CASE Expressions", dur:"20m", d:"Implement if-then logic directly within your SQL queries.", k:"Logic, conditional columns, syntax"},
  {t:"Subqueries", dur:"25m", d:"Nest queries inside one another for complex data retrieval.", k:"Nesting, related data, performance"},
  {t:"Common Table Expressions (CTEs)", dur:"20m", d:"Write cleaner, more readable complex queries with WITH clauses.", k:"Readability, recursion, WITH"}
]},
{t:"Joins", tps:[
  {t:"INNER JOIN", dur:"20m", d:"Combine rows from tables when there is a match in both.", k:"Relations, intersections, Venn diagram"},
  {t:"LEFT & RIGHT OUTER JOIN", dur:"25m", d:"Handle missing relationships without losing data.", k:"Nulls, optional data, padding"},
  {t:"FULL OUTER JOIN", dur:"20m", d:"Retrieve all records when there is a match in either left or right table.", k:"Complete sets, unions, handling nulls"},
  {t:"CROSS JOIN", dur:"15m", d:"Produce a Cartesian product of two tables.", k:"Combinations, performance warning, usage"},
  {t:"Self-Join", dur:"20m", d:"Join a table to itself to compare rows within the same structure.", k:"Hierarchies, recursive patterns"},
  {t:"Multiple Table Joins", dur:"30m", d:"Scale your queries to pull data from 3, 4, or more tables.", k:"Complexity, keys, performance"},
  {t:"Join Performance Tips", dur:"20m", d:"Learn how to write efficient joins that don't crawl on large datasets.", k:"Indexes, keys, selectivity"}
]},
{t:"Database Design", tps:[
  {t:"Entity-Relationship Diagrams", dur:"25m", d:"Visualize your database structure before you build it.", k:"Design, ERD, modeling"},
  {t:"Primary & Foreign Keys", dur:"15m", d:"Ensure data integrity and build relationships between tables.", k:"Constraints, ID, relationships"},
  {t:"1NF, 2NF, 3NF Normalization", dur:"30m", d:"Master the rules of efficient, non-redundant database design.", k:"Efficiency, redundancy, standards"},
  {t:"Denormalization Trade-offs", dur:"25m", d:"Know when to break the rules of normalization for the sake of speed.", k:"Performance, scaling, write vs read"},
  {t:"Constraints", dur:"15m", d:"Enforce business rules at the database level (UNIQUE, CHECK).", k:"Integrity, validation, safety"},
  {t:"Database Indexes", dur:"30m", d:"The secret to fast queries: B-Trees and Hash indexes.", k:"Performance, B-Tree, searching"}
]},
{t:"Advanced SQL", tps:[
  {t:"Window Functions", dur:"35m", d:"Perform calculations across sets of rows related to the current row.", k:"ROW_NUMBER, RANK, Analyst tools"},
  {t:"PARTITION BY", dur:"25m", d:"The key to powerful window function calculations.", k:"Grouping, sorting, analytical sets"},
  {t:"LEAD & LAG Functions", dur:"20m", d:"Compare values between the current row and its neighbors.", k:"Time-series, comparisons, analytics"},
  {t:"Recursive CTEs", dur:"30m", d:"Master the most powerful CTE pattern for hierarchical data.", k:"Trees, recursion, iterations"},
  {t:"JSON Functions", dur:"25m", d:"Query and manipulate semi-structured JSON data inside SQL.", k:"NoSQL in SQL, flexibility, modern web"},
  {t:"Full Text Search", dur:"25m", d:"Implement Google-like searching directly in your database.", k:"Searching, indexing, text processing"},
  {t:"PostgreSQL Deep Dive", dur:"30m", d:"Learn specialized features and tools for the world's most advanced DB.", k:"Postgres, CLI, schemas, performance"}
]}
]},
"Docker":{ diff:"Intermediate", hrs:8, desc:"Containerize applications and manage multi-container environments.", mods:[
{t:"Docker Basics", tps:["Container vs VM","Installing Docker","Docker CLI","Images & Containers","Running Containers","Port Mapping"]},
{t:"Dockerfile", tps:["Dockerfile Syntax","Base Images","COPY & ADD","RUN Commands","ENV Variables","Multi-stage Builds"]},
{t:"Docker Compose", tps:["docker-compose.yml","Services & Networks","Volumes","Environment Files","Profiles","Health Checks"]},
{t:"Docker Networking", tps:["Bridge Networks","Host Networking","Overlay Networks","DNS Resolution","Network Policies"]},
{t:"Docker in Production", tps:["Image Security","Container Registry","Docker Swarm Overview","Kubernetes Overview","CI/CD Integration"]}
]},
"Kubernetes":{ diff:"Advanced", hrs:15, desc:"Orchestrate containers at scale with K8s.", mods:[
{t:"K8s Fundamentals", tps:["Architecture & Components","Pods","ReplicaSets","Deployments","Namespaces","Labels & Selectors"]},
{t:"Networking", tps:["Services (ClusterIP/NodePort/LB)","Ingress Controllers","DNS in K8s","Network Policies","Service Mesh (Istio)"]},
{t:"Storage", tps:["Volumes","PersistentVolumes","PersistentVolumeClaims","StorageClasses","StatefulSets"]},
{t:"Config & Secrets", tps:["ConfigMaps","Secrets","Environment Variables","Volume Mounts","External Secrets Operator"]},
{t:"Helm", tps:["Helm Charts","Values & Templates","Helm Repositories","Upgrading & Rolling Back","Helmfile"]},
{t:"Operations", tps:["kubectl Mastery","Resource Limits","Horizontal Pod Autoscaling","Rolling Updates","Node Affinity"]}
]},
"AWS":{ diff:"Intermediate", hrs:15, desc:"Learn Amazon Web Services core services and architecture.", mods:[
{t:"AWS Fundamentals", tps:["AWS Global Infrastructure","IAM Users & Roles","AWS CLI","Billing & Cost Management","Shared Responsibility Model"]},
{t:"Compute", tps:["EC2 Instances","AMIs & Launch Templates","Auto Scaling Groups","Elastic Load Balancing","Lambda Functions","ECS & Fargate"]},
{t:"Storage", tps:["S3 Buckets","S3 Lifecycle Policies","EBS Volumes","EFS","Glacier","S3 Presigned URLs"]},
{t:"Networking", tps:["VPC Design","Subnets & Route Tables","Security Groups & NACLs","VPN & Direct Connect","CloudFront","Route 53"]},
{t:"Databases", tps:["RDS (PostgreSQL/MySQL)","Aurora","DynamoDB","ElastiCache","Redshift"]},
{t:"DevOps on AWS", tps:["CodePipeline","CodeBuild","CodeDeploy","CloudFormation","CDK","CloudWatch"]}
]},
"System Design":{ diff:"Advanced", hrs:20, desc:"Design scalable distributed systems for real-world applications.", mods:[
{t:"Fundamentals", tps:["Horizontal vs Vertical Scaling","CAP Theorem","ACID vs BASE","Latency vs Throughput","SLOs & SLAs"]},
{t:"Databases at Scale", tps:["SQL vs NoSQL","Sharding","Replication","Database Indexing","Data Warehousing","Time-Series DBs"]},
{t:"Caching Strategies", tps:["Cache-aside","Write-through","Write-behind","Eviction Policies","CDN Caching","Redis Patterns"]},
{t:"Messaging & Queues", tps:["Message Queues","Kafka Architecture","Event Sourcing","CQRS","Pub/Sub Pattern","Dead Letter Queues"]},
{t:"API Design", tps:["REST Best Practices","GraphQL Trade-offs","gRPC","Rate Limiting","Pagination","Versioning"]},
{t:"Real-World Systems", tps:["Design URL Shortener","Design Twitter Feed","Design WhatsApp","Design YouTube","Design Uber","Design Google Drive"]}
]},
"Git and GitHub":{ diff:"Beginner", hrs:4, desc:"Master version control with Git and collaborate on GitHub.", mods:[
{t:"Git Basics", tps:["Installing Git","git init & clone","Staging & Committing","git status & log",".gitignore","Undoing Changes"]},
{t:"Branching", tps:["Creating Branches","Merging","Resolving Conflicts","Rebase","Cherry-pick","Tags & Releases"]},
{t:"GitHub", tps:["Remote Repositories","Push & Pull","Forks & Clones","Pull Requests","Code Reviews","GitHub Issues"]},
{t:"Advanced Git", tps:["git stash","Interactive Rebase","Bisect","Submodules","Git Hooks","Conventional Commits"]}
]},
"Machine Learning":{ diff:"Advanced", hrs:20, desc:"A massive exhaustive path for Machine Learning and AI experts.", mods:[
{t:"Math & Statistics Concepts", tps:[
  {t:"Linear Algebra", dur:"30m", d:"Master the math behind vectors and matrices that powers ML.", k:"Vectors, Matrices, Tensors"},
  {t:"Calculus Fundamentals", dur:"25m", d:"Understand derivatives and gradients for optimization.", k:"Derivatives, Slopes, Optimization"},
  {t:"Probability Distributions", dur:"25m", d:"Learn how to model uncertainty and data patterns.", k:"Gaussian, Bernoulli, Randomness"},
  {t:"Hypothesis Testing", dur:"20m", d:"Statistically prove your findings and model performance.", k:"p-value, Significance, stats"}
]},
{t:"Python for Data", tps:[
  {t:"NumPy Arrays", dur:"30m", d:"The bedrock of scientific computing in Python.", k:"Arrays, broadcasting, performance"},
  {t:"Pandas DataFrames", dur:"40m", d:"Flexible and powerful data analysis and manipulation.", k:"Series, cleaning, aggregation"},
  {t:"Data Cleaning & Wrangling", dur:"35m", d:"Spend 80% of your time correctly preparing your data.", k:"Cleaning, munging, quality"},
  {t:"Matplotlib & Seaborn", dur:"30m", d:"Visualize patterns and outliers in your datasets.", k:"Plots, figures, styling"}
]},
{t:"ML Algorithms", tps:[
  {t:"Linear & Logistic Regression", dur:"30m", d:"The foundational algorithms for regression and classification.", k:"Linear, Binary, sigmoid"},
  {t:"Decision Trees & Random Forests", dur:"35m", d:"Ensemble methods for powerful, interpretable models.", k:"Trees, forests, bagging"},
  {t:"Support Vector Machines", dur:"30m", d:"Master the geometry of high-dimensional separators.", k:"Kernels, margins, classification"},
  {t:"K-Means Clustering", dur:"25m", d:"Group data into meaningful patterns without labels.", k:"Unsupervised, centroids, clusters"},
  {t:"Principal Component Analysis (PCA)", dur:"25m", d:"Reduce noise and visualize high-dimensional data.", k:"Dimensionality, variance, noise"}
]},
{t:"Deep Learning Foundations", tps:[
  {t:"Neural Networks Architecture", dur:"35m", d:"Biologically inspired models for complex pattern recognition.", k:"Neurons, layers, hierarchy"},
  {t:"Backpropagation", dur:"40m", d:"The algorithm that makes deep learning work through derivatives.", k:"Gradients, training, math"},
  {t:"Activation Functions", dur:"20m", d:"Add non-linearity to your networks (ReLU, Sigmoid).", k:"ReLU, Softmax, Tanh"},
  {t:"PyTorch & TensorFlow Basics", dur:"45m", d:"Master the industry-leading frameworks for AI development.", k:"Frameworks, GPU, tensors"}
]},
{t:"Large Language Models", tps:[
  {t:"Self-Attention Mechanism", dur:"35m", d:"The heart of the Transformer architecture (GPT, Claude).", k:"Attention, weights, hierarchy"},
  {t:"Prompt Engineering", dur:"20m", d:"Learn to communicate effectively with AI models.", k:"Prompts, zero-shot, role"},
  {t:"Fine-tuning & LoRA", dur:"40m", d:"Adapt large models to specific tasks efficiently.", k:"Adapters, weights, training"},
  {t:"RAG Architecture", dur:"35m", d:"Connect LLMs to your private data for grounded answers.", k:"Vector DB, retrieval, context"}
]}
]},
"Data Structures & Algorithms":{ diff:"Intermediate", hrs:20, desc:"Ace technical interviews with core CS fundamentals.", mods:[
{t:"Complexity Analysis", tps:["Big O Notation","Time vs Space Complexity","Best/Worst/Average Case","Amortized Analysis"]},
{t:"Arrays & Strings", tps:["Two Pointers","Sliding Window","Matrix Traversal","String Manipulation","Prefix Sums"]},
{t:"Linked Lists", tps:["Singly Linked List","Doubly Linked List","Fast & Slow Pointers","Reversing a List","Cycle Detection"]},
{t:"Trees & Graphs", tps:["Binary Trees","BST Operations","DFS & BFS","Graph Representations","Topological Sort","Dijkstra's Algorithm"]},
{t:"Sorting & Searching", tps:["Bubble & Selection Sort","Merge Sort","Quick Sort","Binary Search","Heap Sort"]},
{t:"Dynamic Programming", tps:["Memoization","Tabulation","Fibonacci","Longest Common Subsequence","Knapsack Problem","Coin Change"]}
]},
"Cyber Security":{ diff:"Advanced", hrs:20, desc:"Complete Cybersecurity path from fundamentals to pentesting and defense.", mods:[
{t:"Security Fundamentals", tps:[
  {t:"CIA Triad", dur:"15m", d:"The core principles of information security: Confidentiality, Integrity, and Availability.", k:"Core goals, trade-offs, standards"},
  {t:"Authentication vs Authorization", dur:"15m", d:"Learn to distinguish between identifying a user and granting them permissions.", k:"Auth, sessions, permissions"},
  {t:"Security Threat Models", dur:"20m", d:"Learn to think like an attacker to identify vulnerabilities before they are exploited.", k:"Threats, modeling, STRIDE"},
  {t:"Common Attack Vectors", dur:"20m", d:"Overview of how attackers gain access to systems and data.", k:"Phishing, malware, exploits"},
  {t:"Zero Trust Architecture", dur:"25m", d:"The modern security paradigm: never trust, always verify.", k:"Identity, verification, safety"},
  {t:"Defense in Depth", dur:"20m", d:"Layering security controls to provide multiple levels of protection.", k:"Redundancy, safety, architecture"}
]},
{t:"Network Security", tps:[
  {t:"Firewalls & WAFs", dur:"25m", d:"Protect your network and web apps from malicious traffic.", k:"Filtering, rules, web security"},
  {t:"Intrusion Detection Systems", dur:"20m", d:"Monitor your systems for signs of compromise or malicious activity.", k:"IDS, IPS, monitoring"},
  {t:"VPNs & Tunneling", dur:"20m", d:"Secure your communication over untrusted networks.", k:"Encryption, privacy, remote access"},
  {t:"TLS/SSL Deep Dive", dur:"30m", d:"How the green padlock works: certificates, handshakes, and encryption.", k:"HTTPS, RSA, handshakes"},
  {t:"DNS Security (DNSSEC)", dur:"20m", d:"Protect the internet's directory from spoofing and hijacking.", k:"DNS, spoofing, safety"},
  {t:"Network Packet Analysis", dur:"30m", d:"Learn to use Wireshark to see exactly what's happening on the wire.", k:"Wireshark, protocols, debugging"}
]},
{t:"Web Application Security", tps:[
  {t:"OWASP Top 10", dur:"40m", d:"Master the industry-standard list of the most critical web security risks.", k:"Vulnerabilities, standards, OWASP"},
  {t:"SQL Injection", dur:"30m", d:"Learn how attackers hijack your database and how to stop them.", k:"Sanitization, parameters, safety"},
  {t:"XSS (Cross-Site Scripting)", dur:"30m", d:"Prevent attackers from running malicious scripts in your users' browsers.", k:"Scripting, safety, escaping"},
  {t:"CSRF Attacks", dur:"25m", d:"Protect your users from being forced to perform unwanted actions.", k:"Tokens, cookies, safety"},
  {t:"IDOR Vulnerabilities", dur:"25m", d:"Ensure users can't access data that doesn't belong to them.", k:"Access control, reference, safety"},
  {t:"JWT Security Issues", dur:"30m", d:"Common pitfalls and best practices for securing modern tokens.", k:"Tokens, signing, verification"}
]},
{t:"Cryptography", tps:[
  {t:"Symmetric Encryption (AES)", dur:"25m", d:"Fast encryption for large amounts of data using a single key.", k:"AES, keys, performance"},
  {t:"Asymmetric Encryption (RSA)", dur:"30m", d:"The foundation of public-key infrastructure and secure web traffic.", k:"RSA, public/private keys"},
  {t:"Hash Functions (SHA-256)", dur:"20m", d:"One-way functions for password storage and data integrity.", k:"Hashing, salt, collision"},
  {t:"Digital Signatures", dur:"25m", d:"Prove that a message was sent by a specific sender and hasn't been modified.", k:"Authenticity, non-repudiation"},
  {t:"Key Exchange (Diffie-Hellman)", dur:"30m", d:"Securely share keys over an insecure channel.", k:"Encryption, keys, math"}
]}
]},
"Android":{ diff:"Intermediate", hrs:15, desc:"Build native Android apps with Kotlin and Jetpack Compose.", mods:[
{t:"Android Basics", tps:["Android Studio Setup","Project Structure","Activities & Intents","Fragments","Layouts (XML & Compose)"]},
{t:"Kotlin for Android", tps:["Kotlin Coroutines","Flow","Extension Functions","Data Classes","Sealed Classes","Null Safety"]},
{t:"Jetpack Compose", tps:["Composable Functions","State & Recomposition","Modifiers","LazyColumn/Row","Navigation","Theming"]},
{t:"Data & Storage", tps:["Room Database","SharedPreferences","DataStore","File I/O","Content Providers"]},
{t:"Networking", tps:["Retrofit","OkHttp","Kotlin Serialization","Coroutines with Network","Handling Errors"]},
{t:"Architecture", tps:["MVVM Pattern","ViewModel","LiveData/StateFlow","Dependency Injection (Hilt)","Clean Architecture"]}
]},
"iOS":{ diff:"Intermediate", hrs:15, desc:"Build native iOS applications with Swift and SwiftUI.", mods:[
{t:"Swift Basics", tps:["Variables & Optionals","Functions & Closures","Enums & Structs","Protocols","Generics","Error Handling"]},
{t:"SwiftUI", tps:["Views & Modifiers","State & Binding","NavigationView","List & Form","Animations","Combine Framework"]},
{t:"UIKit", tps:["UIViewController","Auto Layout","Table Views","Collection Views","Storyboards","Delegation Pattern"]},
{t:"Data", tps:["UserDefaults","CoreData","SwiftData","Keychain","File Manager"]},
{t:"Networking", tps:["URLSession","Codable","Async/Await Networking","Combine for Networking","REST API Integration"]},
{t:"App Store", tps:["Code Signing","App Capabilities","TestFlight","App Store Connect","Analytics & Crash Reports"]}
]},
"Next.js":{ diff:"Intermediate", hrs:10, desc:"Build full-stack React applications with Next.js App Router.", mods:[
{t:"Next.js Basics", tps:["App Router vs Pages Router","File-based Routing","Layouts & Templates","Loading & Error States","Metadata API"]},
{t:"Data Fetching", tps:["Server Components","Client Components","fetch with Caching","Server Actions","ISR & SSG","Dynamic Routes"]},
{t:"Styling", tps:["CSS Modules","Tailwind CSS","CSS-in-JS","Global Styles","Dark Mode"]},
{t:"Authentication", tps:["NextAuth.js","Middleware","Protected Routes","Session Management","OAuth Providers"]},
{t:"Database Integration", tps:["Prisma ORM","Drizzle ORM","PostgreSQL","Vercel Postgres","SQLite"]},
{t:"Deployment", tps:["Vercel Deployment","Environment Variables","Edge Functions","Analytics","Preview Deployments"]}
]},
"Django":{ diff:"Intermediate", hrs:12, desc:"Build robust web applications with Python's most popular framework.", mods:[
{t:"Django Basics", tps:["Project Setup","App Structure","URLconf","Views","Templates","Django Admin"]},
{t:"Models & ORM", tps:["Model Definition","Migrations","QuerySets","Relationships (FK/M2M)","Custom Managers","Raw SQL"]},
{t:"Forms & Validation", tps:["ModelForms","Form Widgets","Custom Validators","CSRF Protection","File Uploads"]},
{t:"Authentication", tps:["Built-in Auth System","Custom User Model","Login/Logout Views","Permissions & Groups","JWT with DRF"]},
{t:"Django REST Framework", tps:["Serializers","APIView & ViewSets","Routers","Authentication Classes","Throttling","Filtering"]},
{t:"Deployment", tps:["settings.py for Production","WhiteNoise (Static Files)","Gunicorn","Nginx","PostgreSQL","Docker"]}
]},
"Vue":{ diff:"Intermediate", hrs:10, desc:"Build progressive web interfaces with Vue.js 3.", mods:[
{t:"Vue Fundamentals", tps:["Vue 3 Composition API","Template Syntax","Reactivity (ref/reactive)","Computed Properties","Watchers","Lifecycle Hooks"]},
{t:"Components", tps:["Props & Emits","Slots","Provide/Inject","Dynamic Components","Async Components","Teleport"]},
{t:"Vue Router", tps:["Route Configuration","Dynamic Routes","Navigation Guards","Nested Routes","Route Meta"]},
{t:"Pinia (State)", tps:["Store Definition","State & Getters","Actions","Composables","Persistence"]},
{t:"Advanced Vue", tps:["Custom Directives","Plugins","Render Functions","SSR with Nuxt","Performance Optimization"]}
]},
"Angular":{ diff:"Intermediate", hrs:12, desc:"Build enterprise-scale SPAs with Angular.", mods:[
{t:"Angular Basics", tps:["Angular CLI","Modules & Components","Templates & Directives","Data Binding","Pipes","Dependency Injection"]},
{t:"Components Deep Dive", tps:["Input & Output","ViewChild","Content Projection","Component Lifecycle","Change Detection"]},
{t:"Services & RxJS", tps:["Services","HttpClient","RxJS Operators","Subjects & BehaviorSubject","Async Pipe","Error Handling"]},
{t:"Angular Router", tps:["Route Configuration","Route Guards","Lazy Loading","Resolver","Query Params"]},
{t:"State Management", tps:["NgRx Basics","Store & Reducers","Effects","Selectors","Signals (New)"]},
{t:"Testing", tps:["Jasmine & Karma","TestBed","Component Testing","Service Mocking","E2E with Cypress"]}
]},
"Flutter":{ diff:"Intermediate", hrs:12, desc:"Build cross-platform mobile apps with Dart and Flutter.", mods:[
{t:"Dart Basics", tps:["Variables & Types","Functions","Lists & Maps","OOP in Dart","Async/Await","Streams"]},
{t:"Flutter Widgets", tps:["StatelessWidget","StatefulWidget","Scaffold & AppBar","Text & Container","ListView","Column & Row"]},
{t:"State Management", tps:["setState","InheritedWidget","Provider","Riverpod","Bloc Pattern","GetX"]},
{t:"Navigation", tps:["Navigator 1.0","GoRouter","Named Routes","Deep Linking","Bottom Navigation"]},
{t:"Data & Backend", tps:["http Package","Dio","Shared Preferences","Hive","SQLite (sqflite)","Firebase Integration"]},
{t:"Animations", tps:["AnimatedWidget","AnimationController","Hero Animations","Lottie","Implicit Animations"]}
]},
"Linux":{ diff:"Beginner", hrs:8, desc:"Master the Linux command line and system administration.", mods:[
{t:"CLI Basics", tps:["Terminal Navigation","File Operations (ls/cp/mv)","File Permissions","Users & Groups","Wildcards & Redirection"]},
{t:"Text Processing", tps:["grep & regex","sed & awk","cut & sort","head & tail","diff & patch","vim / nano"]},
{t:"Shell Scripting", tps:["Bash Scripts","Variables & Arrays","Loops & Conditionals","Functions","Cron Jobs","Signals"]},
{t:"System Administration", tps:["Process Management (ps/kill)","Disk Usage (df/du)","Networking (ifconfig/ss)","Package Managers (apt/yum)","Systemd Services","Log Files (/var/log)"]},
{t:"Security & Networking", tps:["SSH & Key Management","UFW Firewall","File Encryption","Network Scanning","VPN Setup"]}
]},
"MongoDB":{ diff:"Beginner", hrs:6, desc:"Learn NoSQL document databases with MongoDB.", mods:[
{t:"MongoDB Basics", tps:["Documents & Collections","CRUD Operations","MongoDB Compass","Filtering & Projection","Sorting & Limiting"]},
{t:"Advanced Queries", tps:["Aggregation Pipeline","$match & $group","$lookup (Join)","$unwind","Array Operators"]},
{t:"Indexing", tps:["Single Field Indexes","Compound Indexes","Text Indexes","Geospatial Indexes","Index Performance"]},
{t:"Schema Design", tps:["Embedding vs Referencing","One-to-Many Patterns","Schema Validation","Transactions","Change Streams"]},
{t:"Mongoose (Node.js)", tps:["Schema Definition","Models & Methods","Population","Middleware (Hooks)","Virtual Properties"]}
]},
"Redis":{ diff:"Intermediate", hrs:6, desc:"Use Redis as cache, session store, and message broker.", mods:[
{t:"Redis Fundamentals", tps:["Data Structures (Strings/Lists/Sets/Hashes/ZSets)","TTL & Expiration","Persistence (RDB/AOF)","Redis CLI"]},
{t:"Common Use Cases", tps:["Caching Strategies","Session Storage","Rate Limiting","Leaderboards","Real-time Analytics"]},
{t:"Advanced Redis", tps:["Pub/Sub","Redis Streams","Lua Scripting","Transactions (MULTI/EXEC)","Pipelines"]},
{t:"Redis in Production", tps:["Sentinel (High Availability)","Cluster Mode","Redis with Node.js (ioredis)","Redis with Python"]}
]},
"Prompt Engineering":{ diff:"Beginner", hrs:4, desc:"Learn to craft effective prompts for LLMs.", mods:[
{t:"LLM Fundamentals", tps:["How LLMs Work","Tokens & Context Windows","Temperature & Sampling","Model Comparison"]},
{t:"Prompting Techniques", tps:["Zero-shot Prompting","Few-shot Examples","Chain-of-Thought","Role Prompting","ReAct Prompting"]},
{t:"Advanced Techniques", tps:["Tree of Thought","Generated Knowledge","Self-Consistency","Prompt Chaining","RAG Architecture"]},
{t:"Practical Applications", tps:["Code Generation","Data Extraction","Summarization","Classification","Evaluation & Testing"]}
]},
"AI Agents":{ diff:"Advanced", hrs:15, desc:"Build autonomous AI agents and multi-agent systems.", mods:[
{t:"Agent Fundamentals", tps:["What are AI Agents","ReAct Framework","Tool Use","Memory Systems","Planning & Reasoning"]},
{t:"Frameworks", tps:["LangChain Agents","LlamaIndex","AutoGen","CrewAI","Semantic Kernel"]},
{t:"Tools & APIs", tps:["OpenAI Function Calling","Web Search Tools","Code Execution","Database Tools","Browser Tools"]},
{t:"Memory & Storage", tps:["Short-term Memory","Long-term Memory (Vector DB)","Episodic Memory","Pinecone & Chroma"]},
{t:"Multi-Agent Systems", tps:["Agent Orchestration","Agent Roles","Communication Protocols","Supervisory Agents","Human-in-the-Loop"]}
]},
"Kotlin":{ diff:"Intermediate", hrs:10, desc:"Master Kotlin for Android and server-side development.", mods:[
{t:"Kotlin Basics", tps:[
  {t:"Kotlin vs Java", dur:"15m", d:"Understand why Kotlin is the modern choice for Android and server-side.", k:"Interoperability, conciseness, safety"},
  {t:"val vs var", dur:"10m", d:"Master the foundations of immutability in Kotlin.", k:"Read-only, mutable, variables"},
  {t:"Data Types & Literals", dur:"15m", d:"Learn how Kotlin handles basic types like Int, Long, and Strings.", k:"Types, range, literal syntax"},
  {t:"Null Safety & Elvis Operator", dur:"25m", d:"The billion-dollar mistake fixed: how Kotlin avoids NullPointerExceptions.", k:"?, !!, ?:, optionality"},
  {t:"String Templates", dur:"10m", d:"Elegant way to build strings with embedded property values.", k:"Interpolation, syntax, readability"},
  {t:"Ranges & Progressions", dur:"15m", d:"Powerful native range syntax for loops and checks.", k:"1..10, step, downTo"},
  {t:"When Expressions", dur:"20m", d:"The super-powered replacement for switch-case.", k:"Branching, ranges, smart casts"}
]},
{t:"Functions", tps:[
  {t:"Named & Default Parameters", dur:"15m", d:"Write clear code and reduce function overloads.", k:"Readability, defaults, syntax"},
  {t:"Extension Functions", dur:"25m", d:"Extend existing classes with new functionality without inheritance.", k:"Sugar, utility, readability"},
  {t:"Higher-Order Functions", dur:"30m", d:"Functions that take other functions as parameters.", k:"Functional, callbacks, flexibility"},
  {t:"Lambdas", dur:"25m", d:"Lean, anonymous functions for concise code.", k:"it, syntax, trailing lambdas"},
  {t:"Inline Functions", dur:"20m", d:"Increase performance when using lambdas in high-traffic code.", k:"Performance, overhead, compiler"},
  {t:"Infix Functions", dur:"15m", d:"Call functions with natural, word-like syntax.", k:"DSL, readability, syntax"},
  {t:"Operator Overloading", dur:"20m", d:"Give custom meanings to built-in operators like + or -.", k:"Syntax sugar, custom types"}
]},
{t:"OOP in Kotlin", tps:[
  {t:"Classes & Constructors", dur:"25m", d:"Primary, secondary constructors, and init blocks.", k:"Construction, state, properties"},
  {t:"Data Classes", dur:"15m", d:"Boilerplate-free classes designed specifically for holding state.", k:"equals, hashCode, toString, copy"},
  {t:"Sealed Classes", dur:"25m", d:"Restricted hierarchies for better type safety in when-blocks.", k:"State management, safety, types"},
  {t:"Enum Classes", dur:"15m", d:"Constants with type safety and behavior.", k:"Constants, logic, syntax"},
  {t:"Object & Companion Object", dur:"20m", d:"Singletons and static-like members the Kotlin way.", k:"Singletons, static, companion"},
  {t:"Interfaces", dur:"20m", d:"Define behaviors and default implementations.", k:"Abstract, default, mixins"},
  {t:"Delegation Pattern", dur:"25m", d:"Composition over inheritance with the 'by' keyword.", k:"Delegation, reuse, syntax"}
]},
{t:"Functional Programming", tps:[
  {t:"map, filter, reduce", dur:"25m", d:"The workhorses of collection transformation.", k:"Processing, streams, mapping"},
  {t:"flatMap & groupBy", dur:"20m", d:"Handle nested collections and grouping logic with ease.", k:"Transformations, grouping, complexity"},
  {t:"Sequences", dur:"30m", d:"Lazy evaluation for better performance on large datasets.", k:"Yield, lazy, performance"},
  {t:"Scope Functions", dur:"25m", d:"Master let, run, also, apply, and with for idiomatic code.", k:"it vs this, context, chaining"},
  {t:"Immutable Collections", dur:"15m", d:"State safety by default with read-only lists and maps.", k:"List vs MutableList, safety"},
  {t:"Destructuring Declarations", dur:"15m", d:"Extract values from objects directly into variables.", k:"Syntax, data classes, pairs"}
]},
{t:"Coroutines", tps:[
  {t:"suspend Functions", dur:"30m", d:"The foundation of non-blocking, asynchronous Kotlin code.", k:"Asynchrony, waiting, compiler"},
  {t:"CoroutineScope & Builders", dur:"25m", d:"Learn to launch and manage coroutine lifecycles.", k:"launch, async, jobs"},
  {t:"Dispatchers", dur:"20m", d:"Manage threading (IO, Main, Default) for your coroutines.", k:"Threading, performance, IO"},
  {t:"Flow & StateFlow", dur:"35m", d:"Reactive streams designed for modern Kotlin apps.", k:"Streams, reactive, state"},
  {t:"SharedFlow", dur:"25m", d:"Hot streams for broadcasting events across your app.", k:"Events, broadcasting, memory"},
  {t:"Channels", dur:"30m", d:"Direct communication between coroutines.", k:"Communication, patterns, buffers"},
  {t:"Exception Handling", dur:"25m", d:"Safe ways to handle failures in concurrent code.", k:"SupervisorJob, handler, safety"}
]}
]},
"Java":{ diff:"Intermediate", hrs:15, desc:"Master Java for enterprise applications and Android development.", mods:[
{t:"Java Basics", tps:["Data Types & Variables","Control Flow","Arrays","OOP Concepts","Packages","Exception Handling"]},
{t:"OOP Deep Dive", tps:["Inheritance & Polymorphism","Abstract Classes","Interfaces","Inner Classes","Enums","Generics"]},
{t:"Collections Framework", tps:["ArrayList & LinkedList","HashMap & TreeMap","HashSet","Iterators","Comparable & Comparator"]},
{t:"Java 8+", tps:["Lambda Expressions","Stream API","Optional","Default Methods","Date/Time API","Records"]},
{t:"Concurrency", tps:["Threads","Executors","CompletableFuture","Synchronized","Locks","Virtual Threads (Java 21)"]},
{t:"Spring Boot", tps:["Spring Core","REST Controllers","JPA & Hibernate","Security","Testing (JUnit)"]}
]},
"PHP":{ diff:"Beginner", hrs:8, desc:"Build dynamic web applications with PHP.", mods:[
{t:"PHP Basics", tps:["Syntax & Variables","Arrays","Functions","OOP in PHP","Error Handling","Sessions & Cookies"]},
{t:"PHP & MySQL", tps:["PDO & MySQLi","CRUD Operations","Prepared Statements","Transactions","SQL Injection Prevention"]},
{t:"Laravel Framework", tps:["MVC Architecture","Routing","Eloquent ORM","Blade Templates","Middleware","Artisan CLI"]},
{t:"APIs with PHP", tps:["Building REST APIs","JSON Responses","Authentication (Sanctum/Passport)","CORS","API Testing"]}
]},
"Go Roadmap":{ diff:"Intermediate", hrs:12, desc:"Build efficient, concurrent systems with Go.", mods:[
{t:"Go Basics", tps:["Packages & Modules","Variables & Constants","Functions (multiple returns)","Structs","Interfaces","Error Handling"]},
{t:"Go Concurrency", tps:["Goroutines","Channels","select Statement","sync Package","WaitGroups","Context Package"]},
{t:"Go for Web", tps:["net/http Package","Chi / Gin Router","Middleware","JSON Handling","Database (sqlx/pgx)","gRPC"]},
{t:"Testing & Tools", tps:["go test","Table-driven Tests","Benchmarks","go vet & staticcheck","Go Modules","Docker with Go"]}
]},
"Rust":{ diff:"Advanced", hrs:20, desc:"Systems programming with memory safety guarantees.", mods:[
{t:"Rust Basics", tps:["Ownership & Borrowing","Lifetimes","Data Types","Pattern Matching","Enums & Option","Error Handling (Result)"]},
{t:"Advanced Rust", tps:["Traits","Generics","Closures","Iterators","Smart Pointers (Box/Rc/Arc)","Interior Mutability"]},
{t:"Async Rust", tps:["async/await","Tokio Runtime","Futures","Streams","Async Channels","Deadlines & Timeouts"]},
{t:"Systems Programming", tps:["FFI (C Interop)","unsafe Rust","WASM with Rust","Embedded Rust","CLI Tools with Clap"]},
{t:"Web with Rust", tps:["Axum / Actix-web","Diesel ORM","SQLx","Authentication","Deployment"]}
]},
"Terraform":{ diff:"Intermediate", hrs:10, desc:"Provision and manage infrastructure as code.", mods:[
{t:"Terraform Basics", tps:["HCL Syntax","Providers & Resources","terraform init/plan/apply","State File","Variables & Outputs"]},
{t:"Advanced Terraform", tps:["Modules","Data Sources","Locals","Count & for_each","Dynamic Blocks","Conditional Expressions"]},
{t:"State Management", tps:["Remote State (S3/GCS)","State Locking","terraform import","Workspaces","terraform refresh"]},
{t:"Terraform in Practice", tps:["Writing Reusable Modules","Terragrunt","Testing (Terratest)","Atlantis (GitOps)","Terraform Cloud"]}
]},
"UX Design":{ diff:"Beginner", hrs:10, desc:"Learn user experience design principles and tools.", mods:[
{t:"Design Fundamentals", tps:["Design Thinking","User Research Methods","Personas","User Journey Mapping","Information Architecture"]},
{t:"UI Principles", tps:["Typography","Color Theory","Spacing & Layout","Visual Hierarchy","Accessibility (WCAG)","Dark Mode Design"]},
{t:"Wireframing & Prototyping", tps:["Low-fidelity Wireframes","High-fidelity Mockups","Interactive Prototypes","Figma Basics","User Testing"]},
{t:"Design Systems", tps:["Component Libraries","Tokens","Documentation","Storybook","Handoff to Developers"]},
{t:"UX Writing", tps:["Microcopy","Error Messages","Empty States","Onboarding Flows","Content Strategy"]}
]},
"DevSecOps":{ diff:"Advanced", hrs:18, desc:"Integrate security into every stage of the DevOps pipeline.", mods:[
{t:"Security Fundamentals", tps:["Threat Modeling","OWASP Top 10","CVE & CVSS","Security Policies","Zero Trust"]},
{t:"Shift-Left Security", tps:["SAST (Static Analysis)","DAST (Dynamic Testing)","SCA (Dependency Scanning)","Secret Detection (Git)","IDE Security Plugins"]},
{t:"CI/CD Security", tps:["Pipeline Hardening","Supply Chain Security (SLSA)","Signed Commits","SBOM Generation","Container Scanning"]},
{t:"Infrastructure Security", tps:["Terraform Security (Checkov)","K8s Security (Falco)","Network Policies","Pod Security Standards","Vault (Secrets Management)"]},
{t:"Compliance & Monitoring", tps:["SOC2 & ISO 27001 Basics","Audit Logging","SIEM Tools","Vulnerability Management","Incident Response"]}
]},
"GraphQL":{ diff:"Intermediate", hrs:8, desc:"Build flexible, type-safe APIs with GraphQL.", mods:[
{t:"GraphQL Fundamentals", tps:["Schema Definition Language","Types (Object/Scalar/Enum)","Queries & Mutations","Subscriptions","Introspection"]},
{t:"Resolvers", tps:["Resolver Functions","N+1 Problem","DataLoader (Batching)","Context & Authentication","Error Handling"]},
{t:"Apollo", tps:["Apollo Server","Apollo Client","Cache & Caching Policies","Apollo Federation","Apollo Studio"]},
{t:"Advanced GraphQL", tps:["Schema Stitching","Persisted Queries","Rate Limiting","File Uploads","Real-time Subscriptions"]}
]},
"HTML":{ diff:"Beginner", hrs:4, desc:"Master HyperText Markup Language for web structure.", mods:[
{t:"HTML Basics", tps:["Document Structure","Headings & Paragraphs","Links & Images","Lists (ol/ul/dl)","Tables","Meta Tags"]},
{t:"Semantic HTML", tps:["header/nav/main/footer","article & section","figure & figcaption","time & address","ARIA Roles"]},
{t:"HTML Forms", tps:["Input Types","Form Attributes","Validation","Fieldsets & Labels","File Upload","Datalist"]},
{t:"HTML5 APIs", tps:["Canvas API","Drag & Drop","Geolocation","Web Storage","Web Workers","Service Workers"]}
]},
"CSS":{ diff:"Beginner", hrs:5, desc:"Style web pages with Cascading Style Sheets.", mods:[
{t:"CSS Fundamentals", tps:["Selectors & Specificity","Box Model","Display Types","Position","Float","z-index"]},
{t:"Layouts", tps:["Flexbox","CSS Grid","Multi-column","Responsive Design","Container Queries"]},
{t:"Visual Styling", tps:["Typography","Colors & Gradients","Backgrounds","Borders & Shadows","Filters & Effects"]},
{t:"Animations", tps:["Transitions","Keyframe Animations","Transform","CSS Variables","Scroll-driven Animations"]},
{t:"Advanced CSS", tps:["BEM Methodology","CSS Modules","Tailwind CSS","CSS-in-JS","Custom Properties Architecture"]}
]},
"Shell / Bash":{ diff:"Beginner", hrs:5, desc:"Automate tasks with shell scripting.", mods:[
{t:"Shell Basics", tps:["Terminal Navigation","File Commands","Redirection & Pipes","Variables","Quoting","Command Substitution"]},
{t:"Bash Scripting", tps:["Shebang & Permissions","Conditionals (if/case)","Loops (for/while)","Functions","Arguments ($1,$@)","Exit Codes"]},
{t:"Text Processing", tps:["grep","sed","awk","cut & paste","sort & uniq","xargs"]},
{t:"Automation", tps:["Cron Jobs","Process Substitution","SSH Automation","Batch Processing","Signal Trapping"]}
]},
"Product Manager":{ diff:"Beginner", hrs:10, desc:"Lead product development from ideation to launch.", mods:[
{t:"PM Fundamentals", tps:["Product Lifecycle","Agile & Scrum","PRD Writing","OKRs & KPIs","Roadmapping","Stakeholder Management"]},
{t:"User Research", tps:["User Interviews","Surveys & Analytics","Usability Testing","A/B Testing","Jobs-to-be-done Framework"]},
{t:"Product Strategy", tps:["Market Analysis","Competitive Analysis","Positioning","Pricing Strategy","Go-to-Market Planning"]},
{t:"Execution", tps:["Sprint Planning","Backlog Grooming","Acceptance Criteria","Launch Checklist","Post-launch Analysis"]}
]},
"Data Analyst":{ diff:"Beginner", hrs:10, desc:"Analyze data and derive business insights.", mods:[
{t:"Data Foundations", tps:["Data Types","Statistical Basics","Data Collection Methods","Data Cleaning","EDA (Exploratory Analysis)"]},
{t:"Excel & SQL", tps:["Excel Formulas","Pivot Tables","SQL Queries","Aggregations","Joins","Window Functions"]},
{t:"Python for Data", tps:["Pandas","NumPy","Matplotlib & Seaborn","Data Wrangling","Jupyter Notebooks"]},
{t:"Data Visualization", tps:["Tableau Basics","Power BI","Dashboard Design","Storytelling with Data","Chart Selection"]},
{t:"Statistics", tps:["Hypothesis Testing","Confidence Intervals","Correlation vs Causation","Regression Analysis","A/B Test Analysis"]}
]},
"Blockchain":{ diff:"Advanced", hrs:15, desc:"Build decentralized applications on blockchain networks.", mods:[
{t:"Blockchain Basics", tps:["Distributed Ledger","Consensus Mechanisms","Hash Functions","Merkle Trees","Wallets & Keys"]},
{t:"Ethereum", tps:["Accounts & Transactions","Gas & Fees","EVM (Ethereum Virtual Machine)","Ethereum Nodes","ERC Standards"]},
{t:"Smart Contracts", tps:["Solidity Basics","State Variables","Functions & Modifiers","Events","Inheritance","Security Pitfalls"]},
{t:"DApp Development", tps:["Hardhat / Truffle","Ethers.js / Web3.js","MetaMask Integration","IPFS","The Graph (Indexing)"]},
{t:"DeFi & NFTs", tps:["ERC-20 Tokens","ERC-721 (NFTs)","Liquidity Pools","AMM Mechanisms","Layer 2 Solutions"]}
]},
"MLOps":{ diff:"Advanced", hrs:18, desc:"Deploy and maintain ML models in production.", mods:[
{t:"ML Fundamentals", tps:["ML Pipeline Overview","Feature Engineering","Model Training","Evaluation Metrics","Model Versioning"]},
{t:"Experiment Tracking", tps:["MLflow","Weights & Biases","DVC","Model Registry","Experiment Comparison"]},
{t:"Model Deployment", tps:["FastAPI Model Serving","BentoML","TorchServe","TensorFlow Serving","Batch vs Real-time Inference"]},
{t:"Infrastructure", tps:["Docker for ML","Kubernetes for ML","Kubeflow","Airflow Pipelines","Feature Stores"]},
{t:"Monitoring", tps:["Data Drift Detection","Model Performance Monitoring","Retraining Triggers","A/B Testing Models","Explainability (SHAP)"]}
]},
"API Design":{ diff:"Intermediate", hrs:8, desc:"Design robust, scalable APIs following industry standards.", mods:[
{t:"REST Fundamentals", tps:["HTTP Methods & Status Codes","Resource Naming","Statelessness","HATEOAS","Versioning Strategies"]},
{t:"API Security", tps:["OAuth 2.0","JWT Best Practices","API Keys","Rate Limiting","Input Validation","CORS Configuration"]},
{t:"Documentation", tps:["OpenAPI (Swagger)","Postman Collections","API Changelog","SDK Generation","Developer Experience"]},
{t:"GraphQL & gRPC", tps:["When to Use GraphQL","gRPC vs REST","Protocol Buffers","Streaming with gRPC","API Gateway Patterns"]},
{t:"Performance", tps:["Pagination (Cursor/Offset)","Filtering & Sorting","Field Selection","Caching Headers","Compression"]}
]},
"Computer Science":{ diff:"Intermediate", hrs:20, desc:"Core CS fundamentals every developer should know.", mods:[
{t:"Computation Theory", tps:["Binary & Hex","Boolean Logic","Finite Automata","Regular Expressions","Turing Machines"]},
{t:"Data Structures", tps:["Arrays & Linked Lists","Stacks & Queues","Trees & Graphs","Hash Tables","Heaps & Priority Queues"]},
{t:"Algorithms", tps:["Sorting Algorithms","Search Algorithms","Recursion","Divide & Conquer","Greedy Algorithms","Dynamic Programming"]},
{t:"Operating Systems", tps:["Processes & Threads","Memory Management","Virtual Memory","File Systems","Deadlocks","Scheduling"]},
{t:"Networking", tps:["OSI Model","TCP/IP","HTTP/2 & HTTP/3","DNS","TLS/SSL","WebSockets"]},
{t:"Databases", tps:["Relational Model","ACID Properties","B-Tree Indexes","Query Optimization","CAP Theorem"]}
]},

"Android Dev": { diff:"Intermediate", hrs:20, desc:"Build production-grade Android apps with Kotlin and Jetpack Compose, using modern architecture patterns.", mods:[
{t:"Kotlin Language Fundamentals", tps:["Variables, Null Safety & Types","Functions & Lambda Expressions","Data Classes & Sealed Classes","Extension Functions","Coroutines Basics","Kotlin Flow","Scope Functions (let/run/apply)"]},
{t:"Android Studio & Project Setup", tps:["IDE Overview & Shortcuts","Gradle Build System","Project & Module Structure","manifest & permissions","Emulators vs Physical Devices","Logcat & Debugging"]},
{t:"Jetpack Compose UI", tps:["Composable Functions","Recomposition & State","Modifiers & Layout","Text, Image, Button Composables","LazyColumn & LazyRow","Custom Animations (AnimatedVisibility)","Theming with MaterialTheme"]},
{t:"Navigation Component", tps:["NavHost & NavController","Destination Arguments","Deep Links","Bottom Navigation Integration","Nested Navigation Graphs"]},
{t:"ViewModel & State Management", tps:["ViewModel Lifecycle","StateFlow & collectAsState","SharedFlow for Events","LiveData vs StateFlow","SavedStateHandle"]},
{t:"Room Database", tps:["Entity & DAO Definition","TypeConverters","One-to-Many Relations","Database Migrations","Room with Coroutines","Prepopulating Database"]},
{t:"Retrofit & Networking", tps:["Retrofit Setup & Interceptors","OkHttp Logging","Kotlin Serialization / Gson","Error Handling with sealed classes","Coroutines + Retrofit","Caching with OkHttp"]},
{t:"Dependency Injection — Hilt", tps:["Hilt Setup & Modules","@Inject & @Provides","ViewModel Injection","Testing with Hilt","Hilt vs Koin comparison"]},
{t:"Data Layer & Repository Pattern", tps:["Repository as Single Source of Truth","Offline-First Strategy","WorkManager for Background Tasks","DataStore vs SharedPreferences","Flow-based Repository"]},
{t:"Testing Android Apps", tps:["Unit Tests with JUnit & MockK","ViewModel Unit Tests","Room In-Memory DB Tests","Compose UI Tests","Instrumented Tests on Device"]},
{t:"Releasing to Play Store", tps:["Signing & Keystores","Build Variants (Debug/Release)","App Bundle vs APK","ProGuard & R8 Minification","Play Console Submission Checklist"]}
]},

"AI/ML": { diff:"Advanced", hrs:25, desc:"Go from Python ML foundations to building and deploying real neural networks using scikit-learn, TensorFlow, and PyTorch.", mods:[
{t:"Python for ML", tps:["Python Refresher for Data Science","Virtual Environments (venv/conda)","OOP Principles for ML Code","Logging & Reproducibility","Type Hints in ML Projects"]},
{t:"NumPy Essentials", tps:["ndarrays & dtypes","Broadcasting Rules","Vectorized Operations","Indexing & Slicing","Linear Algebra with NumPy","Random Number Generation"]},
{t:"Pandas for Data Wrangling", tps:["DataFrame & Series","Reading CSV, JSON, Excel","Filtering & Grouping","Handling Missing Values","merge & join operations","Time Series with Pandas"]},
{t:"Exploratory Data Analysis", tps:["Univariate Analysis","Correlation Matrices","Outlier Detection","Matplotlib Plots","Seaborn Statistical Plots","Feature Distributions"]},
{t:"Classical ML with Scikit-learn", tps:["Linear & Logistic Regression","Decision Trees & Random Forests","SVM with Kernels","K-Means & DBSCAN Clustering","Cross-Validation & Grid Search","Pipelines & Feature Unions"]},
{t:"Feature Engineering", tps:["One-Hot Encoding","Label Encoding","Imputation Strategies","Feature Scaling (StandardScaler/MinMaxScaler)","Dimensionality Reduction (PCA, t-SNE)","Feature Selection Methods"]},
{t:"Model Evaluation & Metrics", tps:["Confusion Matrix","Precision, Recall, F1-Score","ROC Curve & AUC","RMSE & MAE for Regression","Learning Curves","Overfitting vs Underfitting"]},
{t:"Neural Networks from Scratch", tps:["Perceptron & Activation Functions","Forward & Backpropagation","Gradient Descent Variants","Batch Normalization","Dropout Regularization","Weight Initialization"]},
{t:"TensorFlow & Keras", tps:["Sequential & Functional API","Custom Layers & Models","tf.data Pipeline","Callbacks (ModelCheckpoint, EarlyStopping)","TensorBoard Visualization","Transfer Learning with Keras"]},
{t:"PyTorch", tps:["Tensors & Autograd","nn.Module & Custom Models","DataLoader & Datasets","Training Loop from Scratch","GPU Acceleration (CUDA)","TorchScript & Deployment"]},
{t:"Computer Vision", tps:["CNNs Architecture (LeNet, VGG, ResNet)","Image Augmentation","Object Detection (YOLO overview)","Semantic Segmentation","OpenCV Basics","Fine-tuning Pretrained CNNs"]},
{t:"NLP & Transformers", tps:["Text Preprocessing & Tokenization","Word Embeddings (Word2Vec, GloVe)","RNNs & LSTMs for Text","Attention Mechanism","BERT & Hugging Face Transformers","Prompt Engineering & LLM APIs"]},
{t:"MLOps & Deployment", tps:["FastAPI Model Serving","Docker for ML","MLflow Experiment Tracking","Model Versioning","A/B Testing Models","Cloud Deployment (GCP Vertex AI overview)"]}
]},

"Web Dev": { diff:"Beginner", hrs:22, desc:"Build full-stack web applications from semantic HTML to backend APIs and cloud deployment.", mods:[
{t:"Web Fundamentals", tps:["How Browsers Work","HTTP Request/Response Cycle","DNS & Hosting","Client vs Server Rendering","Web Performance Metrics (Core Web Vitals)"]},
{t:"HTML5 — Semantic & Accessible", tps:["Document Outline & Headings","Semantic Tags (header/nav/main/article)","Forms — Input Types & Validation","ARIA Roles & Accessibility","Meta Tags & Open Graph","Canvas & SVG Basics"]},
{t:"Advanced CSS", tps:["Box Model Deep Dive","Flexbox — 1D Layout","CSS Grid — 2D Layout","Responsive Design & Media Queries","CSS Custom Properties (Variables)","Keyframe Animations & Transitions","CSS Architecture (BEM)"]},
{t:"JavaScript Core", tps:["Event Loop & Call Stack","Closures & Lexical Scope","Prototype Chain & OOP","Async JS — Callbacks, Promises, async/await","Fetch API & REST Calls","ES Modules (import/export)","Error Handling Patterns"]},
{t:"React.js", tps:["JSX & Virtual DOM","Component Composition","useState, useEffect, useRef","Custom Hooks","React Router v6","State Management with Context API","Optimizing with React.memo & useCallback"]},
{t:"TypeScript for Frontend", tps:["Type Annotations & Inference","Interfaces vs Type Aliases","Generics in React Components","Strict Mode Configuration","Typing API Responses","Utility Types"]},
{t:"Node.js & Express Backend", tps:["Node.js Event-Driven Architecture","Express Routing & Middleware","Request Parsing & Validation","Authentication with JWT","File Uploads with Multer","Environment Variables & Config"]},
{t:"Databases", tps:["SQL vs NoSQL Decision Framework","PostgreSQL — Schema Design & Queries","Prisma ORM","MongoDB — Documents & Aggregations","Database Indexing","Transactions & ACID"]},
{t:"Authentication & Security", tps:["Password Hashing (bcrypt)","JWT Lifecycle — Issue, Validate, Refresh","OAuth 2.0 / Social Login","CORS & CSP Headers","Rate Limiting","OWASP Top 10 Basics"]},
{t:"Testing Full-Stack Apps", tps:["Jest Unit Testing","React Testing Library","API Testing with Supertest","E2E Testing with Playwright","Test Coverage Reports","CI Integration"]},
{t:"Deployment & DevOps", tps:["Vercel / Railway / Render","Docker Containerization","GitHub Actions CI/CD Pipeline","Environment-specific Configs","CDN & Asset Optimization","Monitoring & Error Tracking (Sentry)"]}
]},

"DSA": { diff:"Intermediate", hrs:30, desc:"Master data structures and algorithms to nail technical interviews at FAANG and top-tier companies.", mods:[
{t:"Complexity & Big-O", tps:["Big-O Notation Rules","Time vs Space Trade-offs","Best/Average/Worst Case Analysis","Amortized Analysis","Complexity of Built-in Operations"]},
{t:"Arrays & Strings", tps:["Two-Pointer Technique","Sliding Window Pattern","Prefix Sum & Difference Array","Kadane's Algorithm (Max Subarray)","Boyer-Moore Voting Algorithm","Dutch National Flag Problem","String Matching (KMP Algorithm)"]},
{t:"Linked Lists", tps:["Singly vs Doubly Linked Lists","Reversal (Iterative & Recursive)","Floyd's Cycle Detection Algorithm","Merge Two Sorted Lists","LRU Cache Implementation","Skip Lists Overview"]},
{t:"Stacks & Queues", tps:["Monotonic Stack Pattern","Min Stack / Max Stack","Valid Parentheses & Bracket Matching","Queue Using Two Stacks","Sliding Window Maximum (Deque)","Daily Temperatures Problem"]},
{t:"Trees", tps:["Binary Tree Traversals (In/Pre/Post/Level)","Binary Search Tree Operations","AVL Trees & Rotations","Segment Trees","Fenwick Tree (BIT)","Lowest Common Ancestor","Serialize & Deserialize Binary Tree"]},
{t:"Heaps & Priority Queues", tps:["Min & Max Heap","Heap Sort","K Largest/Smallest Elements","Median of a Stream","Merge K Sorted Lists","Task Scheduler Problem"]},
{t:"Graphs", tps:["Graph Representations (Adjacency List/Matrix)","DFS & BFS Traversal","Topological Sort (Kahn's & DFS)","Dijkstra's Shortest Path","Bellman-Ford Algorithm","Union-Find (DSU)","Kruskal's & Prim's MST"]},
{t:"Sorting Algorithms", tps:["Merge Sort (Stable O(n log n))","Quick Sort & Partitioning","Heap Sort","Counting Sort & Radix Sort","Tim Sort (Python's default)","External Sorting Concepts"]},
{t:"Binary Search", tps:["Classic Binary Search","Finding Boundaries (First/Last occurrence)","Search in Rotated Sorted Array","Capacity to Ship Problem","Koko Eating Bananas","Minimize Max Distance"]},
{t:"Recursion & Backtracking", tps:["Recursion Tree Visualization","Subsets & Permutations","N-Queens Problem","Sudoku Solver","Word Search in Grid","Combination Sum Variants"]},
{t:"Dynamic Programming", tps:["Memoization vs Tabulation","1D DP — Fibonacci, Climbing Stairs, House Robber","2D DP — Grid Paths, Edit Distance","Knapsack Problem (0/1 & Unbounded)","Longest Common Subsequence","Longest Increasing Subsequence","DP on Trees","DP on Intervals (Burst Balloons)"]},
{t:"System Design Basics", tps:["Horizontal vs Vertical Scaling","Consistent Hashing","Load Balancing","CAP Theorem","SQL vs NoSQL Choice","Rate Limiter Design","Design URL Shortener (URL → Hash → Redirect)"]}
]},

"DevOps": { diff:"Advanced", hrs:15, desc:"Master the art of continuous integration, deployment, and infrastructure orchestration.", mods:[
{t:"Linux & Networking", tps:["Bash Scripting","Linux File Systems","SSH & Keys","DNS & DHCP","OSI Model"]},
{t:"Containerization", tps:["Docker Basics","Dockerfiles","Docker Compose","Container Registries","Volume Mounts"]},
{t:"Infrastructure as Code", tps:["Terraform Syntax","State Management","Ansible","Configuration Management","Immutable Infrastructure"]},
{t:"CI/CD Pipelines", tps:["GitHub Actions","GitLab CI","Jenkins Pipelines","Deployment Strategies (Blue/Green, Canary)"]},
{t:"Kubernetes Orchestration", tps:["Pods & Nodes","Deployments & ReplicaSets","Services & Ingress","ConfigMaps & Secrets","Helm Charts"]}
]},

"Cyber Security": { diff:"Advanced", hrs:20, desc:"Learn how to protect networks, systems, and programs from digital attacks.", mods:[
{t:"Security Fundamentals", tps:["CIA Triad","Threat Modeling","Symmetric vs Asymmetric Encryption","Hashing Algorithms"]},
{t:"Network Security", tps:["Firewalls & Proxy","IDS/IPS","VPNs & Tunneling","Wireshark & Packet Analysis","Port Scanning"]},
{t:"Web App Security", tps:["OWASP Top 10","SQL Injection","Cross-Site Scripting (XSS)","CSRF","Authentication Bypasses"]},
{t:"Ethical Hacking", tps:["Reconnaissance & Footprinting","Metasploit","Nmap","Burp Suite","Privilege Escalation"]}
]},

"Blockchain": { diff:"Intermediate", hrs:18, desc:"Explore decentralized ledgers, smart contracts, and Web3 development.", mods:[
{t:"Blockchain Basics", tps:["Cryptography Refresher","Distributed Ledgers","Proof of Work vs Proof of Stake","Nodes & Mining"]},
{t:"Ethereum & Smart Contracts", tps:["EVM Architecture","Solidity Syntax","ERC-20 Tokens","Gas Limits & Optimization"]},
{t:"Web3 Integration", tps:["Web3.js & Ethers.js","MetaMask Integration","ABI Definitions","Interacting with Contracts"]},
{t:"DeFi & Security", tps:["Decentralized Exchanges (DEX)","Liquidity Pools","Reentrancy Attacks","Smart Contract Auditing"]}
]},

"iOS": { diff:"Intermediate", hrs:15, desc:"Build native Apple applications with Swift and SwiftUI.", mods:[
{t:"Swift Fundamentals", tps:["Variables & Constants","Optionals","Structs vs Classes","Closures","Protocols"]},
{t:"SwiftUI Basics", tps:["Views & Modifiers","State & Binding","VStack & HStack","Lists & Navigation"]},
{t:"Data Flow", tps:["ObservableObject","EnvironmentObject","Combine Framework","AppStorage"]},
{t:"Networking & Persistence", tps:["URLSession","Codable","CoreData","App Lifecycle"]}
]},

"PostgreSQL": { diff:"Beginner", hrs:12, desc:"Deep dive into the world's most advanced open source relational database.", mods:[
{t:"SQL Basics", tps:["SELECT & WHERE","Joins","Group By & Having","Subqueries","Window Functions"]},
{t:"Database Design", tps:["Normalization (1NF-3NF)","Primary & Foreign Keys","Constraints","Entity-Relationship Diagrams"]},
{t:"Performance & Optimization", tps:["B-Tree Indexes","Query Execution Plans","EXPLAIN ANALYZE","Connection Pooling"]}
]}
};
