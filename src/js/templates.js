window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["account.ejs"] = '<% if (user) { %>  <form class="form account-form">    <label for="email">Email</label>    <input name="email" type="email" placeholder="Email" value="<%= user.email %>" />    <label for="pass">Update your password<br /><small>Leave blank if are not updating your password</small></label>    <input name="pass" type="password" placeholder="New Password" />    <label for="current_pass">Confirm your current password</label>    <input name="current_pass" type="password" placeholder="Current Password" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } else { %>  <p><a href="#/signin">Sign in</a> to edit your account.</p><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["forgot.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form forgot-form">    <p>Enter your email address and instructions will be sent to reset your password</p>    <input name="email" type="text" placeholder="Email" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["header.ejs"] = '<nav class="nav main" role="menubar">  <% if (user) { %>    <a href="#/" role="menuitem" class="nav-item">Home</a>    <a href="#/app" role="menuitem" class="nav-item">My Relationships</a>    <a href="#/relationships/add" role="menuitem" class="nav-item add-relationship">Add Relationship</a>    <a href="#/account" role="menuitem" class="nav-item">Account</a>    <a href="#/signout" role="menuitem" class="nav-item sign-out-link">Sign Out</a>  <% } else { %>    <!-- <a href="#/signin" role="menuitem" class="nav-item">Sign In</a>    <a href="#/signup" role="menuitem" class="nav-item">Sign Up</a> -->  <% } %></nav><div class="message main" role="alert"></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["meeting_form.ejs"] = '<form class="meeting-form">  <h2>    I    <select name="method">      <% _.each(methods, function(m){ %>        <option value="<%= m.value %>" <%= m.value==method.value ? "selected" : "" %>><%= m.verb_past %></option>      <% }) %>    </select>    <%= relationship.name %>  </h2>  <% if (!meeting) { %>    <div class="button-group">      <button class="days-ago" days-ago="0">Today</button>      <button class="days-ago" days-ago="1">Yesterday</button>      <button class="days-ago" days-ago="2">2 Days Ago</button>    </div>  <% } %>  <label for="date">On Date:</label>  <input type="date" name="date" placeholder="yyyy-mm-dd" value="<%= meeting ? UTIL.formatDateInput(meeting.date) : \'\' %>">  <label for="notes"><%= meeting ? \'Note: \' : \'Add A Note: \' %></label>  <textarea name="notes"><%= meeting ? meeting.notes : \'\' %></textarea>  <% if (meeting) { %>  <a href="#/meeting/remove" class="remove-meeting">Remove this meeting</a>  <input name="id" type="hidden" value="<%= meeting.id %>" />  <% } %>  <input type="hidden" name="relationship_id" value="<%= relationship.id %>" />  <button type="submit">Submit</button></form><div class="button-group">  <button class="edit-relationship">Edit Settings</button>  <% if (meetings && meetings.length) { %>  <button class="view-meetings">View/Edit Past Meetings</button>  <% } %></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["meeting_list.ejs"] = '<h2>Meetings with <%= relationship.name %></h2><div class="meeting-list">  <% _.each(meetings, function(meeting){ %>    <div class="meeting">      <% if (meeting.methodObj) { %>      <div class="method"><%= meeting.methodObj.label %></div>      <% } %>      <div class="date"><%= UTIL.formatDate(meeting.date) %> <em>(<%= UTIL.timeAgo(meeting.date) %>)</em></div>      <% if (meeting.notes.length) { %>      <div class="notes"><%= meeting.notes %></div>      <% } %>      <a href="#/edit/meeting/<%= meeting.id %>" data-id="<%= meeting.id %>" class="edit-meeting">[edit]</a>    </div>  <% }) %></div><div class="button-group">  <button class="edit-relationship">Edit Settings</button>  <button class="add-meeting">Add New Meeting</button></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["relationship.ejs"] = '<div class="wrapper">  <div class="light level<%= level %>"></div>  <div class="light flicker level<%= level %>"></div>  <div class="string"></div></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["relationship_form.ejs"] = '<form class="relationship-form">  <h2><%= relationship ? \'Edit\' : \'Add A\' %> Relationship</h2>  <label for="name">Name</label>  <input name="name" type="text" value="<%= relationship ? relationship.name : \'\' %>" />  <label for="method">Contact Method</label>  <select name="method">    <% _.each(methods, function(m){ %>      <option value="<%= m.value %>" <%= relationship && relationship.method==m.value ? \'selected\' : \'\' %>><%= m.label %></option>    <% }) %>  </select>  <label for="rhythm">Rhythm</label>  <select name="rhythm">    <% _.each(rhythms, function(r){ %>      <option value="<%= r.value %>" <%= relationship && relationship.rhythm==r.value ? \'selected\' : \'\' %>><%= r.label %></option>    <% }) %>  </select>  <% if (relationship) { %>  <a href="#/relationship/remove" class="remove-relationship">Remove this relationship</a>  <input name="id" type="hidden" value="<%= relationship.id %>" />  <% } %>  <button type="submit">Submit</button></form><% if (relationship) { %>  <div class="button-group">    <button class="view-meetings">View/Edit Past Meetings</button>    <button class="add-meeting">Add New Meeting</button>  </div><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["relationship_options.ejs"] = '<h2><%= relationship.name %></h2><% if (last_meeting) { %>  <h4>Last <%= last_meeting.method.verb_past %></h4>  <p><%= UTIL.formatDate(last_meeting.date) %> <em>(<%= UTIL.timeAgo(last_meeting.date) %>)</em></p><% } %><% if (rhythm) { %>  <h4>Rhythm</h4>  <p> <%= rhythm.label %></p><% } %><div class="button-group">  <button class="add-meeting">Add New Meeting</button>  <button class="edit-relationship">Edit Settings</button>  <button class="view-meetings">View/Edit Past Meetings</button></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["reset.ejs"] = '<form class="form reset-form">  <label form="pass">Enter a new password</label>  <input name="pass" type="password" placeholder="New Password" />  <button type="submit">Submit</button>  <div class="message"></div></form>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["signin.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form signin-form">    <input name="email" type="text" placeholder="Email" />    <input name="pass" type="password" placeholder="Password" />    <button type="submit">Submit</button>    <div class="message"></div>    <p><a href="#/forgot">Forgot your password?</a></p>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["signup.ejs"] = '<% if (user) { %>  <p>You are already logged in! <a href="#/">Return to homepage</a>.</p><% } else { %>  <form class="form signup-form">    <input name="email" type="email" placeholder="Email" />    <input name="pass" type="password" placeholder="Password" />    <button type="submit">Submit</button>    <div class="message"></div>  </form><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["space.ejs"] = '<div class="space">    <div class="intro <%= !space ? \'active\' : \'\' %>">    <p>Intro. <a href="#/signin">Sign in</a> or <a href="#/signup">sign up</a>.</p>  </div>  <div class="empty <%= space && !space.relationships.length ? \'active\' : \'\' %>">    <p>No relationships yet. <a href="#/relationships/add" class="add-relationship">Add one</a>.</p>  </div>  <div class="relationships-wrapper"></div></div>';