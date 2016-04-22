---
# This install manager is no longer supported.
---

This install manager was used during part of 2014 to manage a set of Mozilla Foundation projects that have been retired or made redundant since, and as such this installer is not maintained or supported anymore, either.

This repository may be deleted at some unspecified point in the future, and it is not advisable to try to make it work, as it does not support the current Mozilla Foundation projects, and the projects it did support will almost guaranteeed not install correctly.

---
# Legacy README.md text follows
---
# Webmaker Suite Package Manager and Task Runner

The code in this branch is for the terminal-menu based package manager
and task runner for the webmaker suite of tools. For the webmaker suite
deploy scripts, please use the `deployscripts` branch.

## Before we get started

Before we get started, it's important to note this is a new system, and
you might run into "this is not intuitive" or "this can be improved"
things. When that happens, please file individual issues for each thing
because it will let us improve this package manager based on what you
need it to do, rather than what we think it should do.

On to business: while not strictly speaking needed for everything, the
Webmaker core tools require you to have [Java](https://www.java.com), [Elasticsearch](http://www.elasticsearch.org) and
[MongoDB](http://www.mongodb.org) installed. They are not required for *all* the projects that
reside under the Webmaker umbrella, but most tools rely on the `login`
and `MakeAPI` services, which means you will need these three things
installed and set up correctly.

One dependency that **is** required for everything is [Node.js](). If
you are on an operating system with a package manager (such as Linux or OSX
with [brew]()), make sure your package manager is up to date as far as
the node.js package is concerned. This might require you to tell your
package manager to add a new package endpoint to its list of known package
endpoints.

## Getting started

### Step one

Make sure you have `node` installed. If you haven't we're not
going to get very far.

### Step two

Clone this repository to your computer using either the Git GUI or your
command line:
```
$> git clone https://github.com/mozilla/webmaker-suite.git
```
and then open a terminal (if you didn't already just use that) and find
your way to the webmaker-suite directory/folder, and inside that, run:
```
$> npm install
```
This will install the node.js packages that the webmaker suite package
manager and task runner will need to do its job. You shouldn't need any
kind of `sudo` or administrator rights for this command, so if you're in
some flavour of unix/linux and you're getting permission errors, it's
possible that you need to `chown` your user profile dir (and underlying
directories). Usually this is not necessary, but we've seen installations
where for some reason the permissions for the user profile dir were never
set correctly, and `chown` should solve that problem.

### Step three

Run the webmaker suite package manager and task runner by running:
```
$> node run
```
You should see the following screen, and you'll be ready to set it up
according to your needs:

![image](https://cloud.githubusercontent.com/assets/177243/4533642/e659ddac-4d9d-11e4-8abc-be48604fbc72.png)

## Using the package manager

Now that we have the package manager running, let's run through how it can
be used to install webmaker components and how we can set up run profiles
for it to use.

### Installing dependencies

First off, the manager will check whether the necessary dependencies are
installed or not. Any dependency that hasn't been installed (yet) will
show as "not installed" in the main menu, and can be selected to either
automatically install it (if possible) or get all the information necessry
to install it manually.

#### Manually installable dependencies

Java, Elasticsearch and MongoDB cannot be automatically installed by the
package manager because of install differences between the various operating
systems, as well as permission requirements and different OS-level package
manager for the various versions of unix/Linux.

However, selecting these dependencies will give you information on how to
install these yourself. For instance, the Elasticsearch dependency will
show the following information when selected:

![image](https://cloud.githubusercontent.com/assets/177243/4533646/f1c93854-4d9d-11e4-83f6-3e72631c7c0e.png)

#### Automatically installable dependencies

Gulp and Grunt can be automatically installed, as these are `npm` managed
node modules, and selecting them will give you the choice to either install
them from the webmaker package manager, or leaving it up to you to do so
manually:

![image](https://cloud.githubusercontent.com/assets/177243/4533655/fd78f0ea-4d9d-11e4-8c0b-73eec58e6b52.png)

### Installing Components

When you first enter the "install components" screen, you will not have any
of the webmaker components installed yet. For practical reasons it's a good
idea to select `Login` and `MakeAPI` at the very least: navigate to these
options by using your cursor keys, and use the *enter* key to select/deselect
any component.

![image](https://cloud.githubusercontent.com/assets/177243/4533661/036d847a-4d9e-11e4-96c5-be68c9fa9eef.png)

It is recommended that you install all three "Core" components, in addition
to the tools you're actually interested in, as the core components allow
authenticated operations in the rest of the tools, like saving, publishing,
and seeing all the content that you made with most of the webmaker tools.

Once a selection of components has been made, choose "install selected
components" to (not surprisingly) install the selected components. Once the
installation is done, the terminal will return to the package manager menu
system.

#### NOTE/WARNING

If you ever come back to this menu, already installed components will be
shown checked. If you leave these checked and select "install selected
componets", these components will be **reinstalled**, rather than passed
over during installation. **any changes you made to files for these
Componentswill be lost**.

### Syncing components with Mozilla's latest versions

The "Synchronise components with Mozilla" screen will let you select components
to "synchronize" with Mozilla's latest codebase.

![image](https://cloud.githubusercontent.com/assets/177243/4533663/087afc4a-4d9e-11e4-8e16-e4f61a9d620d.png)

Selecting one or more components and choosing "update selected components"
will cause the manager to trigger a `git` fetch from the official Mozilla
repository, and will forward your `develop` and `master` branches to whatever
the latest codebase is on the Mozilla repository for that component. This
does not affect your own branches.

#### NOTE/WARNING

**Never, ever, work in develop or master**. If you want to edit files, even
just to see a tiny change, make sure you are **NOT** on the `develop` or `master`
branch. If you are, change your branch to `develop` first (if not already),
and then create a new branch with whatever name you like, and change to that
branch. In the terminal this would be:
```
$> git checkout develop
$> git checkout -b myownbranch
```
This would put you in a new branch called "myownbranch" that is based on `develop`,
so that if you change any files, you're not interfering with the official master
and develop branches. These should remain **untouched**.

**This is the single-most important rule to follow**. Never, ever, work in master
or develop directly. Did we mention you should never work in develop or master?
Because you shouldn't.

### Setting up a run profile

In addition to installing components and keeping them up to date, we can also
use the package manager as a task running, provided we set up one or more run
profiles.

If you select the "Create run profile" option, we'll get to a screen that lets
us define a collection of known components (even if they're not installed right
now!) that all need to be run concurrently to do "something". We can save that
collection as a profile, and then run that profile whenever we like.

![image](https://cloud.githubusercontent.com/assets/177243/4533668/0f920ab4-4d9e-11e4-9e7d-1fa14da9c51e.png)

For instance, to use [Thimble](https://thimble.webmaker.org) we'll need a profile that starts the Core components,
Thimble, and makes use of the Elasticsearch and Mongo dependencies:

![image](https://cloud.githubusercontent.com/assets/177243/4533670/1331508a-4d9e-11e4-836c-04fa6282e497.png)

If we save this profile, we'll now see it listed in the main menu:

![image](https://cloud.githubusercontent.com/assets/177243/4533674/1976a8be-4d9e-11e4-88c1-dd5eb1e3d278.png)

Note that this called profile "1", and we can run this profile in two ways:

#### Run a profile from the manager

The obvious way is to run the profile from the manager, by simply navigating
to it with the cursor keys, and hitting *enter*. Done, it will now start
running all the components and dependencies that were marked in the profile.

#### Running a profile without running the manager

Any profile has an associated number, which can be used to immediately run the
associated components from the command line. Rather than starting the package
manager with
```
$> node run
```
We can immediately run a profile by specifying its number:
```
$> node run 1
```
This will immediately run profile 1. If we have seven profiles, then we could
start the fifth profile by using:
```
$> node run 5
```
Quite convenient.

#### Manually editing profiles

Profiles are actually just JSON data, stored in a file called `.profiles`,
so if you are unhappy with a particular profile, you can actually load up
the `.profiles` file in your editor of choice, and simply edit it to what
you want it to be.

And if you're truly unhappy with, you can just delete the `.profiles` file
and the package manager will build a new one for you when you (re)run it.

## Hacking on the package manager

If you don't just want to work with the webmaker suite of tools, but actually
want to hack on the package manager, there are several important files that
control which components the package manager knows about, and which dependencies
may be required.

### Dependencies

All dependencies are described in the `./src/requirements.js` file. Have
a look at what's in this file to get a sense of what the format for additional
requirements should be.

Note that not everything runs with the same commands between the various
operating systems, so there is an extra step in the file for ensuring that
on the Windows platform the commands are corrected to what they need to be.

### Components

All components are described in the `./src/components.js` file. Each entry
has a `repo`, `env`, and `run` property that is used to determine where the
code comes from, how the project is set up after cloning and `npm install`
steps, and which command(s) to use to start up that particular tool.

## Bugs

File bugs. If you find one, file it, and we can fix it. Even if it's an easy
fix and you already fixed it, file it, and then submit your fix as a github
PR (pull request) from your fork to us.

And of course if you're going to do that, you'll have modified files, so
when you do, one more time just to make sure:

**Do not make changes in your master or develop branch!**

Create a new branch based on develop, make your changes, and then push those
changes up to your personal fork on github.com, then create a PR from that
branch to mozilla/webmaker-suite's master branch.
