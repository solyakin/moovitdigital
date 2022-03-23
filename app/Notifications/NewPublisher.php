<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewPublisher extends Notification implements ShouldQueue
{
    use Queueable;
    private $publisherinfo;
    // private $name;
    // private $company;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($publisherinfo)
    {
        $this->publisherinfo = $publisherinfo;
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
        // $name = $this->publisherinfo['firstname'];
        // $company = $this->publisherinfo['company'];
        return (new MailMessage)
            ->line($this->publisherinfo['heading'])
            ->line('We have a new publisher on-board 😊')
            ->action($this->publisherinfo['text'], $this->publisherinfo['url'])
            ->line($this->publisherinfo['thanks']);
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
            'firstName' => $this->publisherinfo['firstName'],
            'company' => $this->publisherinfo['company']
        ];
    }
}
