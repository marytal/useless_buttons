class StatsController < ApplicationController
  respond_to :json, :html

  def index
    @stats = Stats.all
    respond_with @stats
  end

  def update
    updated_stats = Stats.find_by_button_id(params[:id]);
    if params[:high_score]
      updated_stats.update({high_score: params[:high_score], high_scorer_name: params[:high_scorer_name]})
    end
    updated_stats.update({times_played: updated_stats.times_played + 1})
    respond_with updated_stats
  end

end
