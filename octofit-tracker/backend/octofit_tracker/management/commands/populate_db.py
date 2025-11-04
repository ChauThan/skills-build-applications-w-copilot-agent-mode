from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Drop collections if they exist
        for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
            db[col].drop()

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        # Sample data
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
        ]
        teams = [
            {"name": "Marvel", "members": ["Iron Man", "Captain America"]},
            {"name": "DC", "members": ["Batman", "Wonder Woman"]},
        ]
        activities = [
            {"user": "Iron Man", "activity": "Running", "duration": 30},
            {"user": "Batman", "activity": "Cycling", "duration": 45},
        ]
        leaderboard = [
            {"team": "Marvel", "points": 100},
            {"team": "DC", "points": 90},
        ]
        workouts = [
            {"user": "Wonder Woman", "workout": "Yoga", "suggestion": "Morning routine"},
            {"user": "Captain America", "workout": "HIIT", "suggestion": "Evening session"},
        ]

        db.users.insert_many(users)
        db.teams.insert_many(teams)
        db.activities.insert_many(activities)
        db.leaderboard.insert_many(leaderboard)
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
