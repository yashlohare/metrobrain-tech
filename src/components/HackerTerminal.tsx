"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HackerTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ command: string; response: React.ReactNode }[]>([
    {
      command: "init",
      response: (
        <div className="text-cyan-400">
          Metrobrain Neural Core [Version 10.0.19045.2846]<br/>
          (c) Metrobrain Technology. All rights reserved.<br/><br/>
          Type 'help' to see available commands.
        </div>
      )
    }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "~" || e.key === "\`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        response = (
          <div className="text-white/80 pl-4">
            Available commands:<br/>
            <span className="text-cyan-400">about</span>    - Learn about the system<br/>
            <span className="text-cyan-400">contact</span>  - Establish neural sync<br/>
            <span className="text-cyan-400">clear</span>    - Clear terminal output<br/>
            <span className="text-cyan-400">whoami</span>   - Identify current user<br/>
            <span className="text-cyan-400">exit</span>     - Close terminal
          </div>
        );
        break;
      case "about":
        response = "Metrobrain Technology is an elite software engineering agency specializing in custom AI, Cloud Architecture, and bleeding-edge web platforms. We architect the future.";
        break;
      case "contact":
        response = "Initiating contact sequence...";
        setTimeout(() => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent("open-contact"));
        }, 1000);
        break;
      case "clear":
        setHistory([]);
        return;
      case "whoami":
        response = "guest@metrobrain_guest_node_448";
        break;
      case "exit":
        setIsOpen(false);
        return;
      case "sudo rm -rf /":
        response = <span className="text-red-500 font-bold">ACCESS DENIED. Incident reported to security mainframe.</span>;
        break;
      case "":
        response = "";
        break;
      default:
        response = <span className="text-red-400">Command not recognized: '{trimmed}'. Type 'help' for available commands.</span>;
    }

    setHistory((prev) => [...prev, { command: cmd, response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed top-0 left-0 right-0 z-[99999] h-[50vh] sm:h-[40vh] bg-black/90 backdrop-blur-md border-b border-cyan-500/30 shadow-[0_10px_50px_rgba(6,182,212,0.1)] font-mono text-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <TerminalIcon className="w-4 h-4" />
              <span>root@metrobrain-server:~</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-4 h-[calc(100%-40px)] overflow-y-auto custom-scrollbar flex flex-col gap-2">
            {history.map((entry, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex gap-2 text-cyan-500">
                  <span>root@metrobrain:~$</span>
                  <span className="text-white">{entry.command}</span>
                </div>
                {entry.response && <div className="text-white/70 mb-2">{entry.response}</div>}
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex gap-2 text-cyan-500">
              <span>root@metrobrain:~$</span>
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white focus:ring-0 placeholder:text-transparent caret-cyan-500"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
