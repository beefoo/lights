window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["account.ejs"] = '<% if (user) { %>  <form class="form account-form">    <label for="email">Email</label>    <input name="email" type="email" placeholder="Email" value="<%= user.email %>" />    <label for="pass">Update your password<br /><small>Leave blank if are not updating your password</small></label>    <input name="pass" type="password" placeholder="New Password" />    <label for="current_pass">Confirm your current password</label>    <input name="current_pass" type="password" placeholder="Current Password" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } else { %>  <p><a href="#/signin">Sign in</a> to edit your account.</p><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["forgot.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form forgot-form">    <p>Enter your email address and instructions will be sent to reset your password</p>    <input name="email" type="text" placeholder="Email" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["header.ejs"] = '<h1><a href="#/">Home</a></h1><nav class="nav main" role="menubar">  <% if (user) { %>    <a href="#/account" role="menuitem" class="nav-item">Account</a>    <a href="#/signout" role="menuitem" class="nav-item sign-out-link">Sign Out</a>  <% } else { %>    <a href="#/signin" role="menuitem" class="nav-item">Sign In</a>    <a href="#/signup" role="menuitem" class="nav-item">Sign Up</a>  <% } %></nav><div class="message" role="alert"></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["light.ejs"] = '<div>Light</div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["reset.ejs"] = '<form class="form reset-form">  <label form="pass">Enter a new password</label>  <input name="pass" type="password" placeholder="New Password" />  <button type="submit">Submit</button>  <div class="message"></div></form>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["signin.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form signin-form">    <input name="email" type="text" placeholder="Email" />    <input name="pass" type="password" placeholder="Password" />    <button type="submit">Submit</button>    <div class="message"></div>    <p><a href="#/forgot">Forgot your password?</a></p>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["signup.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form signup-form">    <input name="email" type="email" placeholder="Email" />    <input name="pass" type="password" placeholder="Password" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["space.ejs"] = '<p>Main</p>';