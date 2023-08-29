import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    
    const now = new Date();
    const diff = now.getTime() - new Date(value).getTime();
    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 7 * 4));
    const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 7 * 4 * 12));
    if (diffSeconds < 60) {
        return 'just now';
        }
    else if (diffMinutes < 60) {
        return diffMinutes + ' minutes ago';
        }
    else if (diffHours < 24) {
        return diffHours + ' hours ago';
        }
    else if (diffDays < 7) {
        return diffDays + ' days ago';
        }
    else if (diffWeeks < 4) {
        return diffWeeks + ' weeks ago';
        }
    else if (diffMonths < 12) {
        return diffMonths + ' months ago';
        }
    else {
        return diffYears + ' years ago';
        }  
  }
}
