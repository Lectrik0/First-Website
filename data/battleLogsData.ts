import { BattleLog } from '@/types';

export const battleLogs: BattleLog[] = [
    {
        id: '1',
        title: 'The Fall of Blue Keep',
        machine: 'Blue (HackTheBox)',
        status: 'DEFEATED',
        date: '2024-11-15',
        difficulty: 'Easy',
        description: 'Exploited EternalBlue vulnerability to gain initial foothold. Lateral movement through SMB shares led to admin access.',
        tags: ['Windows', 'EternalBlue', 'SMB', 'Privilege Escalation'],
        link: '#'
    },
    {
        id: '2',
        title: 'Web of Deception',
        machine: 'Lame (HackTheBox)',
        status: 'DEFEATED',
        date: '2024-10-22',
        difficulty: 'Easy',
        description: 'Classic Samba exploitation. Found misconfigured FTP service leading to command execution.',
        tags: ['Linux', 'Samba', 'FTP', 'Command Injection'],
        link: '#'
    },
    {
        id: '3',
        title: 'The Phantom Fortress',
        machine: 'Forest (HackTheBox)',
        status: 'DEFEATED',
        date: '2024-09-08',
        difficulty: 'Medium',
        description: 'Active Directory enumeration revealed Kerberoasting opportunities. Cracked service account hash for privilege escalation.',
        tags: ['Windows', 'Active Directory', 'Kerberoasting', 'LDAP'],
        link: '#'
    },
    {
        id: '4',
        title: 'The Serpent\'s Riddle',
        machine: 'Cache (HackTheBox)',
        status: 'EVADED',
        date: '2024-07-21',
        difficulty: 'Medium',
        description: 'Encountered OpenEMR vulnerability but struggled with post-exploitation. The serpent remains undefeated.',
        tags: ['Linux', 'OpenEMR', 'SQL Injection', 'Docker'],
        link: '#'
    },
    {
        id: '5',
        title: 'Shadow Protocol',
        machine: 'Netmon (HackTheBox)',
        status: 'DEFEATED',
        date: '2024-08-12',
        difficulty: 'Easy',
        description: 'PRTG Network Monitor default credentials led to authenticated RCE. Quick victory.',
        tags: ['Windows', 'PRTG', 'CVE-2018-9276', 'RCE'],
        link: '#'
    },
    {
        id: '6',
        title: 'Digital Ghost',
        machine: 'Shocker (HackTheBox)',
        status: 'DEFEATED',
        date: '2024-07-30',
        difficulty: 'Easy',
        description: 'Shellshock vulnerability in CGI scripts. Classic but effective exploitation path.',
        tags: ['Linux', 'Shellshock', 'CGI', 'Bash'],
        link: '#'
    }
];
