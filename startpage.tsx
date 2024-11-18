'use client'

import { useState, useEffect } from 'react'
import { Search, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const searchEngines = [
  { name: 'Google', url: 'https://www.google.com/search?q=' },
  { name: 'Microsoft Bing', url: 'https://www.bing.com/search?q=' },
  { name: 'Startpage', url: 'https://www.startpage.com/do/search?q=' },
  { name: 'Ecosia', url: 'https://www.ecosia.org/search?q=' },
  { name: 'Wikipedia (Japanese)', url: 'https://ja.wikipedia.org/wiki/' },
  { name: 'Wikipedia (English)', url: 'https://en.wikipedia.org/wiki/' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
  { name: 'Amazon', url: 'https://www.amazon.co.jp/s?k=' },
  { name: 'Perplexity AI', url: 'https://www.perplexity.ai/search?q=' },
  { name: 'Brave Search', url: 'https://search.brave.com/search?q=' },
  { name: 'mojeek', url: 'https://www.mojeek.com/search?q=' },
  { name: 'nicovideo', url: 'https://www.nicovideo.jp/search/' },
  { name: 'bilibili', url: 'https://search.bilibili.com/all?keyword=' },
  { name: 'Baidu', url: 'https://www.baidu.com/s?wd=' },
  { name: 'Aliexpress', url: 'https://www.aliexpress.com/w/wholesale-' },
  { name: 'Temu', url: 'https://www.temu.com/search_result.html?search_key=' },
]

const backgroundOptions = [
  { name: 'Gradient', value: 'gradient' },
  { name: 'Solid Color', value: 'solid' },
  { name: 'Image', value: 'image' },
]

export default function Startpage() {
  const [query, setQuery] = useState('')
  const [selectedEngine, setSelectedEngine] = useState(searchEngines[0])
  const [background, setBackground] = useState(backgroundOptions[0])
  const [isAnimated, setIsAnimated] = useState(true)
  const [isRotating, setIsRotating] = useState(false)
  const [customColor, setCustomColor] = useState('#667eea')
  const [customImage, setCustomImage] = useState('')
  const [isFloating, setIsFloating] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.toLowerCase() === 'how to stop animation') {
      setIsAnimated(false)
      alert('Animation has stopped.')
    } else if (query.toLowerCase() === 'how to start animation') {
      setIsAnimated(true)
      alert('Animation has started.')
    } else if (query.toLowerCase() === 'how to turning') {
      setIsRotating(true)
      alert('Start Rotating.')
    } else if (query.toLowerCase() === 'how to stop turning') {
      setIsRotating(false)
      alert('Rotating was rapidly stopped.')
    } else {
      window.open(selectedEngine.url + encodeURIComponent(query), '_blank')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string)
        setBackground(backgroundOptions.find(bg => bg.value === 'image') || backgroundOptions[0])
      }
      reader.readAsDataURL(file)
    }
  }

  const getBackgroundStyle = () => {
    switch (background.value) {
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, var(--gradient-1), var(--gradient-2), var(--gradient-3), var(--gradient-4), var(--gradient-5), var(--gradient-6), var(--gradient-7))',
          backgroundSize: '800% 800%',
          animation: isAnimated ? 'gradient 10s ease infinite' : 'none',
        }
      case 'solid':
        return { backgroundColor: customColor }
      case 'image':
        return { backgroundImage: `url(${customImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      default:
        return {}
    }
  }

  const savePreferences = () => {
    const preferences = {
      background: background.value,
      isFloating,
      customColor,
      isDarkTheme,
    }
    localStorage.setItem('startpagePreferences', JSON.stringify(preferences))
    alert('Preferences saved!')
  }

  const loadPreferences = () => {
    const savedPreferences = localStorage.getItem('startpagePreferences')
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences)
      setBackground(backgroundOptions.find(bg => bg.value === preferences.background) || backgroundOptions[0])
      setIsFloating(preferences.isFloating)
      setCustomColor(preferences.customColor)
      setIsDarkTheme(preferences.isDarkTheme)
    }
  }

  useEffect(() => {
    loadPreferences()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme)
  }, [isDarkTheme])

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkTheme])

  return (
    <div className={`min-h-screen flex justify-center items-center transition-colors ${isRotating ? 'animate-[rotate_8s_linear_infinite]' : ''}`} style={getBackgroundStyle()}>
      <style jsx global>{`
        :root {
          --gradient-1: ${isDarkTheme ? '#1e3a8a' : '#667eea'};
          --gradient-2: ${isDarkTheme ? '#3730a3' : '#764ba2'};
          --gradient-3: ${isDarkTheme ? '#5b21b6' : '#9b59b6'};
          --gradient-4: ${isDarkTheme ? '#9d174d' : '#e74c3c'};
          --gradient-5: ${isDarkTheme ? '#92400e' : '#f39c12'};
          --gradient-6: ${isDarkTheme ? '#065f46' : '#2ecc71'};
          --gradient-7: ${isDarkTheme ? '#1e40af' : '#3498db'};
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <div className={`bg-background/10 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-md w-full space-y-4 ${isFloating ? 'animate-[float_3s_ease-in-out_infinite]' : ''}`}>
        <div className="flex flex-wrap justify-center gap-2">
          {searchEngines.map((engine) => (
            <a
              key={engine.name}
              href={engine.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              {engine.name}
            </a>
          ))}
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Select 
            value={selectedEngine.name} 
            onValueChange={(value) => setSelectedEngine(searchEngines.find(engine => engine.name === value) || searchEngines[0])}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select search engine" />
            </SelectTrigger>
            <SelectContent>
              {searchEngines.map((engine) => (
                <SelectItem key={engine.name} value={engine.name}>
                  {engine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 left-4">Settings</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark:text-white">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="theme" className="text-right dark:text-gray-300">
                Theme
              </Label>
              <Switch
                id="theme"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
              />
              <div className="col-span-2">
                {isDarkTheme ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="background" className="text-right dark:text-gray-300">
                Background
              </Label>
              <Select
                value={background.value}
                onValueChange={(value) => setBackground(backgroundOptions.find(bg => bg.value === value) || backgroundOptions[0])}
              >
                <SelectTrigger id="background" className="col-span-3">
                  <SelectValue placeholder="Select background" />
                </SelectTrigger>
                <SelectContent>
                  {backgroundOptions.map((bg) => (
                    <SelectItem key={bg.value} value={bg.value}>
                      {bg.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {background.value === 'image' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right dark:text-gray-300">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3"
                />
              </div>
            )}
            {background.value === 'solid' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right dark:text-gray-300">
                  Color
                </Label>
                <Input
                  id="color"
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="col-span-3"
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="floating" className="text-right dark:text-gray-300">
                Floating Animation
              </Label>
              <Switch
                id="floating"
                checked={isFloating}
                onCheckedChange={setIsFloating}
              />
            </div>
          </div>
          <Button onClick={savePreferences}>Save Preferences</Button>
          <div className="mt-4 dark:text-gray-300">
            <h3 className="font-semibold dark:text-white">Hints</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Type "how to start turning" to start rotating the page.</li>
              <li>Type "how to stop turning" to stop the rotation.</li>
              <li>Type "how to stop animation" to stop the background animation (when using gradient).</li>
              <li>Type "how to start animation" to start the background animation (when using gradient).</li>
            </ul>
            <p className="text-sm font-semibold mt-2 dark:text-white">IMPORTANT: Please don't use white background in solid color option.</p>
          </div>
        </DialogContent>
      </Dialog>
      <a href="https://flatponch.xyz" className="fixed bottom-4 right-4 text-foreground hover:text-primary transition-colors">
        the creator
      </a>
    </div>
  )
}