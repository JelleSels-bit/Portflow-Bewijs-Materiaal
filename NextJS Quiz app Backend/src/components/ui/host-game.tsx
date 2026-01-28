'use client'

import {useState, useEffect} from 'react'
import {useSearchParams, useRouter} from 'next/navigation'
import {Loader2} from 'lucide-react'
// import { getSupabase } from "@/lib/supabase"
import type {Quiz, Spelsessie} from '@/lib/types'
import {HostWaiting} from '@/components/ui/host-waiting'
import {HostPlaying} from '@/components/ui/host-playing'
import {HostResults} from '@/components/ui/host-results'

export function HostGame() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const quizId = searchParams.get('quizId')

  const [loading, setLoading] = useState(true)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [session, setSession] = useState<Spelsessie | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!quizId) {
      // Voor testdoeleinden kun je dit even uitvinken als je geen URL param hebt,
      // maar normaal wil je naar home als er geen quizId is.
      // router.push("/")
      // return
    }
    void loadQuizAndCreateSession()
  }, [quizId]) // De router en loadQuizAndCreateSession hoeven hier niet per se in, maar quizId wel.

  // useEffect(() => {
  //   if (!session) return
  //   const supabase = getSupabase()
  //   const channel = supabase.channel(`host-session-${session.id}`).subscribe()
  //   return () => { supabase.removeChannel(channel) }
  // }, [session])

  const loadQuizAndCreateSession = async () => {
    try {
      const mockQuiz: Quiz = {
        id: quizId || '1',
        title: 'Demo Quiz',
        description: 'Een demo quiz voor testen',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(), // Added missing updated_at field to match Quiz type
      }
      setQuiz(mockQuiz)

      const roomCode = generateRoomCode()
      const mockSession: Spelsessie = {
        id: 'demo-session-1',
        quiz_id: mockQuiz.id,
        room_code: roomCode,
        status: 'waiting',
        current_question_index: 0,
        started_at: null, // Added missing started_at field to match Spelsessie type
        ended_at: null, // Added missing ended_at field to match Spelsessie type
        created_at: new Date().toISOString(),
      }
      setSession(mockSession)

      // Original Supabase code - commented out
      // const supabase = getSupabase()
      // const { data: quizData } = await supabase.from("quiz").select("*").eq("id", quizId).single()
      // const { data: sessionData } = await supabase.from("spelsessie").insert({ ... }).select().single()
    } catch (error) {
      console.error('Error loading quiz:', error)
      alert('Kon de quiz niet laden')
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const generateRoomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const copyRoomCode = () => {
    if (session) {
      navigator.clipboard.writeText(session.room_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!quiz || !session) {
    return null
  }

  if (session.status === 'waiting') {
    return <HostWaiting session={session} quiz={quiz} onCopyCode={copyRoomCode} copied={copied} />
  }

  if (session.status === 'playing') {
    return <HostPlaying session={session} quiz={quiz} />
  }

  if (session.status === 'finished') {
    return <HostResults session={session} quiz={quiz} />
  }

  return null
}
