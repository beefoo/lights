window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["header.ejs"] = '<h1><a href="#/">Home</a></h1><nav class="nav main" role="menubar">  <% if (user) { %>    <a href="#/signout" role="menuitem" class="nav-item sign-out-link">Sign Out</a>  <% } else { %>    <a href="#/signin" role="menuitem" class="nav-item">Sign In</a>    <a href="#/signup" role="menuitem" class="nav-item">Sign Up</a>  <% } %></nav><div class="message" role="alert"></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["light.ejs"] = '<div>Light</div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["signin.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form signin-form">    <input name="email" type="text" placeholder="Email" />    <input name="pass" type="password" placeholder="Password" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["signup.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form signup-form">    <input name="email" type="email" placeholder="Email" />    <input name="pass" type="password" placeholder="Password" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["space.ejs"] = '<p>Main</p>';