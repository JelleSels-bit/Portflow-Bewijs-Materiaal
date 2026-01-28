"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trophy, Star, Clock, TrendingUp } from "lucide-react"

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Mock user data - purely for UI demonstration
  const userData = {
    name: "Gebruiker",
    initials: "GB",
    email: "gebruiker@voorbeeld.nl",
    joinedDate: "Januari 2025",
    stats: {
      gamesPlayed: 24,
      quizzesCreated: 5,
      averageScore: 780,
      winRate: 42,
    },
    achievements: [
      { name: "Eerste Quiz", description: "Maak je eerste quiz", unlocked: true },
      { name: "Winnaar", description: "Win 5 games", unlocked: true },
      { name: "Quiz Master", description: "Win 10 games", unlocked: false },
      { name: "Snelle Denker", description: "Beantwoord 10 vragen binnen 5 seconden", unlocked: true },
    ],
    recentGames: [
      { name: "Algemene Kennis", score: 850, rank: 1, date: "2 uur geleden" },
      { name: "Geschiedenis Quiz", score: 720, rank: 3, date: "5 uur geleden" },
      { name: "Film & Series", score: 900, rank: 1, date: "Gisteren" },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={profileImage || undefined} alt={userData.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                {userData.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
              <p className="text-muted-foreground mb-2">{userData.email}</p>
              <p className="text-sm text-muted-foreground">Lid sinds {userData.joinedDate}</p>
              <div className="flex gap-2 mt-4 justify-center md:justify-start">
                <Button variant="outline">Bewerk Profiel</Button>
                <Button variant="outline">Upload Foto</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.stats.gamesPlayed}</p>
                <p className="text-sm text-muted-foreground">Games Gespeeld</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.stats.quizzesCreated}</p>
                <p className="text-sm text-muted-foreground">Quizzes Gemaakt</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.stats.averageScore}</p>
                <p className="text-sm text-muted-foreground">Gemiddelde Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.stats.winRate}%</p>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Prestaties</CardTitle>
            <CardDescription>Jouw behaalde successen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.achievements.map((achievement, index) => (
              <div key={index}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${achievement.unlocked ? "bg-primary/10" : "bg-muted"}`}>
                    <Trophy className={`h-5 w-5 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{achievement.name}</p>
                      {achievement.unlocked && <Badge variant="secondary">Behaald</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
                {index < userData.achievements.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Games */}
        <Card>
          <CardHeader>
            <CardTitle>Recente Games</CardTitle>
            <CardDescription>Je laatste quiz sessies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.recentGames.map((game, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{game.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={game.rank === 1 ? "default" : "secondary"}>#{game.rank}</Badge>
                      <span className="text-sm text-muted-foreground">{game.score} punten</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {game.date}
                  </div>
                </div>
                {index < userData.recentGames.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
