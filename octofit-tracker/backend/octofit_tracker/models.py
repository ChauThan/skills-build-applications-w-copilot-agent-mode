from djongo import models
from django import forms

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=100)

    class Meta:
        db_table = 'users'

class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.JSONField()  # list of names

    class Meta:
        db_table = 'teams'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)
    duration = models.IntegerField()

    class Meta:
        db_table = 'activities'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()

    class Meta:
        db_table = 'leaderboard'

class Workout(models.Model):
    user = models.CharField(max_length=100)
    workout = models.CharField(max_length=100)
    suggestion = models.TextField()

    class Meta:
        db_table = 'workouts'