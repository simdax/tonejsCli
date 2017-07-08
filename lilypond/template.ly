\include "./includes.ly"

melody = {
  \clef treble
  \key c \major
  \time 4/4
  \transpose c c'' \mel
}

text = \lyricmode {
}

upper = \relative c'' {
  \clef treble
  \key c \major
  \time 4/4

  \basseAccords
}

lower = {
  \clef bass
  \key c \major
  \time 4/4
  \basse
}

\score {
  <<
  \new ChordNames {
    \set chordChanges = ##t
    \basse
  }
  \new Voice = "mel" \with { 
    \remove "Note_heads_engraver"
    \consists "Completion_heads_engraver"
    \remove "Rest_engraver"
    \consists "Completion_rest_engraver"
    }  \melody
    \new Lyrics \lyricsto mel \text
    \new PianoStaff <<
    \new Staff = "upper" {
      \new Voice \with { 
        \remove "Note_heads_engraver"
        \consists "Completion_heads_engraver"
        \remove "Rest_engraver"
        \consists "Completion_rest_engraver"
        }  \upper
      }
    \new Staff = "lower"  {
      \new Voice \with { 
        \remove "Note_heads_engraver"
        \consists "Completion_heads_engraver"
        \remove "Rest_engraver"
        \consists "Completion_rest_engraver"
        }  \lower
      }
    >>
  >>
  \layout {
    \context { \Staff \RemoveEmptyStaves }
  }
  \midi { }
}