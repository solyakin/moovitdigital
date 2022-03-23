<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AssignNotification extends Notification implements ShouldQueue
{
    use Queueable;
    private $assignMail;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($assignMail)
    {
        $this->assignMail = $assignMail;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line($this->assignMail['name'])
            ->line($this->assignMail['body'])
            ->action($this->assignMail['text'], $this->assignMail['url'])
            ->line($this->assignMail['thanks']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'title' => $this->assignMail['title']
        ];
    }
}
