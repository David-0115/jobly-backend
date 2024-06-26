#Jobly backend API documentation

- Endpoints

    - /auth
        -POST /token  (User login)
            - Authentication required: none
            - Accepts: { username, password } required.
            - Returns: { token }
        
        -POST /register  (User registration)
            - Authentication required: none
            - Accepts: { username, password, firstName, lastName, email } required.
            - Returns: { token }

    - /companies
        -POST /  (Create company)
            - Authentication required: admin login
            - Accepts: { handle, name, description, numEmployees, logoUrl }
            - Returns: { handle, name, description, numEmployees, logoUrl }

        -GET /  (List companies)
            - Authentication required: none
            - Accepts: Optional query string
                -Can filter on provided search filters:
                    -minEmployees
                    -maxEmployees
                    -nameLike (will find case-insensitive, partial matches)
            - Returns: { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }

        -GET /:handle (Company detail, company jobs by handle)
            - Authentication required: none
            - Accepts: none
            - Returns: Company is { handle, name, description, numEmployees, logoUrl, jobs } where jobs is [{ id, title, salary, equity }, ...]

        -PATCH /:handle (Update company details by handle)
            - Authentication required: admin login
            - Accepts: Any of these fields { name, description, numEmployees, logo_url }
            - Returns: { handle, name, description, numEmployees, logo_url }

        -DELETE /:handle (Delete company by handle)
            - Authentication required: admin login
            - Accepts: none
            - Returns: {deleted: handle}

    - /jobs
        - POST / (Create job)
            - Authentication required: admin login
            - Accepts: { title, salary, equity, companyHandle } required.
            - Returns: { id, title, salary, equity, companyHandle }

        - GET / (List jobs)
            - Authentication required: none
            - Accepts: Optional query string
                - Can filter on provided search filters:
                    - minSalary
                    - hasEquity (true returns only jobs with equity > 0, other values ignored)
                    - title (will find case-insensitive, partial matches)
            - Returns: { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }

        - GET /:id (Job by id)
            - Authentication required: none
            - Accepts: none
            - Returns: { id, title, salary, equity, company } where company is { handle, name, description, numEmployees, logoUrl }

        - PATCH /:id (Update job by id)
            - Authentication required: admin login
            - Accepts: Any of these fields { title, salary, equity }
            - Returns: { id, title, salary, equity, companyHandle }

        - DELETE /:id (Delete job by id)
            - Authentication required: admin login
            - Accepts: none
            - Returns: {deleted : id}

    - /users
        - POST / (Admin route to create a user, not a registration endpoint)
            - Authentication required: admin login
            - Accepts: { username, password, firstName, lastName, email } required.
            - Returns: {user: { username, firstName, lastName, email, isAdmin }, token }

        - GET / (Admin list of users)
            - Authentication required: admin login
            - Accepts: none
            - Returns: { users: [ {username, firstName, lastName, email }, ... ] }

        - GET /:username (User detail, user applied jobs)
            - Authentication required: admin or same-user-as-:username
            - Accepts: none
            - Returns: { username, firstName, lastName, isAdmin, jobs } where jobs is { id, title, companyHandle, companyName, state }

        - PATCH /:username (Update user details)
            - Authentication required: admin or same-user-as-:username
            - Accepts: Any of these fields { firstName, lastName, password, email }
            - Returns: { username, firstName, lastName, email, isAdmin }

        - DELETE /:username (Delete user account)
            - Authentication required: admin or same-user-as-:username
            - Accepts: none
            - Returns: {deleted: username}

        - POST /:username/jobs/:id  (Apply for job)
            - Authentication required: admin or same-user-as-:username
            - Accepts: none
            - Returns: {"applied": jobId}

