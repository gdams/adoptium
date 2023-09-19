---
title: The Triage Rhyme
date: "2023-09-18T16:00:00+00:00"
author: adamfarley
description: A simple ditty to help triagers remember key information about the triage process.
tags:
  - adoptium
---

The build/test triage process can sometimes be difficult to remember at the end of a long day.

This blog was created to help triagers remember some key aspects of triage, and to give hard-working community supporters a well-deserved chuckle.

Note that this is not meant to be a substitute for the [existing triage documentation](https://github.com/adoptium/aqa-tests/blob/master/doc/Triage.md).

And now, without further ado, I present:

## The Triage Rhyme

![T](T.png) is for TReSS, so go take a [gander](## "Identify failed pipelines via TRSS."). 
We're perusing a mess, of pipelines [red](## "Red means a job has failed. Framework errors, build failures, etc.")/
[amber](## "Amber often means that a unit test failed, but the test framework completed.").

![R](R.png) means Results, a [text file](## "Search failed job output for error keywords.") conniption! 
[Search \"Error:\"!]("\"Error:\" is often associated with errors.") 
[Search \"FAILURE\"!]("\"FAILURE\" usually means a subjob failed, like Smoke Tests after a build.") 
[Search Donner and Blitzen!](## "Donner and Blitzen are Santa's reindeer. They are a metaphor for \"search for everything\".")

![I](I.png) gets you [Issues](## "Search repositories for related issues."), or maybe gets none. 
[Un problem, un issue;](## "Put a link to your failure in any existing issues, to keep the issue up-to-date.") 
you only need [one](## "An existing issue means further triage is not needed.").

![A](A.png) checks the Archives, [dig till you drop](## "Do some digging to find the general source of the issue."). 
You will find the [cause](## "Frequent offenders are upstream changesets and test/build framework updates."), for this unforeseen stop.

![G](G.png) will be Gather, with [many a fact](## "Be sure to gather job links, log files, and a copy of the error message.")! 
[Make an issue on git](## "Raise an issue in the relevant repository."), 
[help the bug fixer act](## "Always start with a summary of the problem, to help bug fixers grasp the issue quickly.").

![E](E.png) brings an End, so go rest your eyes. Triage is a [quest](## "Always look for bigger fish before trying to solve anything."), 
with [knowledge](## "Triage is about creating a knowledge base *before* task prioritization.") 
the [prize](## "Work smarter, not harder. :)").

## The End
